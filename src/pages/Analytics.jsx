"use client";

import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { AgGridReact } from "ag-grid-react";
import { AgChartsEnterpriseModule } from "ag-charts-enterprise";
import {
  ClientSideRowModelModule,
  ModuleRegistry,
} from "ag-grid-community";
import {
  ColumnMenuModule,
  ContextMenuModule,
  IntegratedChartsModule,
  RowGroupingModule,
} from "ag-grid-enterprise";
import { getEmployeePerformanceData, getDepartmentMetricsData, getTopPerformersData } from "./data";
import Header from "../components/Header";
import "./styles.css";
import Footer from "../components/Footer";

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  IntegratedChartsModule.with(AgChartsEnterpriseModule),
  ColumnMenuModule,
  ContextMenuModule,
  RowGroupingModule,
]);

let chartRef;

const Analytics = () => {
  const gridRef = useRef(null);
  const [rowData, setRowData] = useState([]);
  const [activeDataset, setActiveDataset] = useState('performance');
  
  // Column definitions for different datasets
  const performanceColumns = [
    {
      field: "period",
      chartDataType: "category",
      headerName: "Time Period",
      width: 120,
    },
    {
      field: "engineering",
      chartDataType: "series",
      headerName: "Engineering",
      valueFormatter: (params) => params.value?.toFixed(1) || '0.0',
    },
    {
      field: "marketing",
      chartDataType: "series",
      headerName: "Marketing",
      valueFormatter: (params) => params.value?.toFixed(1) || '0.0',
    },
    {
      field: "sales",
      chartDataType: "series",
      headerName: "Sales",
      valueFormatter: (params) => params.value?.toFixed(1) || '0.0',
    },
    {
      field: "hr",
      chartDataType: "series",
      headerName: "HR",
      valueFormatter: (params) => params.value?.toFixed(1) || '0.0',
    },
    {
      field: "finance",
      chartDataType: "series",
      headerName: "Finance",
      valueFormatter: (params) => params.value?.toFixed(1) || '0.0',
    },
    {
      field: "projectsCompleted",
      chartDataType: "series",
      headerName: "Projects Completed",
    },
    {
      field: "employeeSatisfaction",
      chartDataType: "series",
      headerName: "Satisfaction Score",
      valueFormatter: (params) => params.value?.toFixed(1) || '0.0',
    },
  ];

  const departmentColumns = [
    {
      field: "department",
      chartDataType: "category",
      headerName: "Department",
      width: 120,
    },
    {
      field: "performance",
      chartDataType: "series",
      headerName: "Performance",
      valueFormatter: (params) => params.value?.toFixed(1) || '0.0',
    },
    {
      field: "productivity",
      chartDataType: "series",
      headerName: "Productivity %",
    },
    {
      field: "satisfaction",
      chartDataType: "series",
      headerName: "Satisfaction",
      valueFormatter: (params) => params.value?.toFixed(1) || '0.0',
    },
    {
      field: "turnover",
      chartDataType: "series",
      headerName: "Turnover %",
    },
    {
      field: "headcount",
      chartDataType: "series",
      headerName: "Headcount",
    },
  ];

  const [columnDefs, setColumnDefs] = useState(performanceColumns);

  const defaultColDef = useMemo(() => ({
    flex: 1,
    minWidth: 100,
    sortable: true,
    filter: true,
    resizable: true,
  }), []);

  const chartToolPanelsDef = useMemo(() => ({
    defaultToolPanel: "settings",
  }), []);

  const loadPerformanceData = useCallback(async () => {
    const data = await getEmployeePerformanceData();
    setRowData(data);
    setColumnDefs(performanceColumns);
    setActiveDataset('performance');
  }, [performanceColumns]);

  const loadDepartmentData = useCallback(async () => {
    const data = await getDepartmentMetricsData();
    setRowData(data);
    setColumnDefs(departmentColumns);
    setActiveDataset('department');
  }, [departmentColumns]);

  const loadTopPerformersData = useCallback(async () => {
    const data = await getTopPerformersData();
    setRowData(data);
    setActiveDataset('performers');
  }, []);

  const onGridReady = useCallback((params) => {
    loadPerformanceData();
  }, [loadPerformanceData]);

  const onFirstDataRendered = useCallback((params) => {
    if (chartRef) {
      params.api.closeChartToolPanel({ chartId: chartRef.chartId });
    }
    
    const chartColumns = activeDataset === 'performance' 
      ? ["period", "engineering", "marketing", "sales", "hr", "finance"]
      : ["department", "performance", "productivity", "satisfaction"];
    
    chartRef = params.api.createRangeChart({
      chartContainer: document.querySelector("#myChart"),
      cellRange: {
        columns: chartColumns,
      },
      chartType: "groupedColumn",
      suppressChartRanges: true,
      aggFunc: "sum",
    });
  }, [activeDataset]);

  const updateChart = useCallback((chartType) => {
    if (chartRef && gridRef.current) {
      gridRef.current.api.updateChart({
        type: "rangeChartUpdate",
        chartId: `${chartRef.chartId}`,
        chartType: chartType,
      });
    }
  }, []);

  // Load different datasets
  React.useEffect(() => {
    if (rowData.length > 0) {
      // Recreate chart when dataset changes
      setTimeout(() => {
        if (gridRef.current) {
          gridRef.current.api.refreshCells({ force: true });
        }
      }, 100);
    }
  }, [rowData, activeDataset]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Employee Analytics
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Comprehensive performance analytics and workforce insights with interactive charts
          </p>
        </div>

        <div className="wrapper">
          {/* Dataset Selector */}
          <div className="button-container">
            <button 
              onClick={loadPerformanceData}
              className={`dataset-btn ${activeDataset === 'performance' ? 'active' : ''}`}
            >
              Performance Trends
            </button>
            <button 
              onClick={loadDepartmentData}
              className={`dataset-btn ${activeDataset === 'department' ? 'active' : ''}`}
            >
              Department Metrics
            </button>
            <button 
              onClick={loadTopPerformersData}
              className={`dataset-btn ${activeDataset === 'performers' ? 'active' : ''}`}
            >
              Top Performers
            </button>
          </div>

          {/* Chart Type Controls */}
          <div className="button-container">
            <button onClick={() => updateChart("groupedColumn")}>
              Grouped Column
            </button>
            <button onClick={() => updateChart("stackedColumn")}>
              Stacked Column
            </button>
            <button onClick={() => updateChart("normalizedColumn")}>
              Normalized Column
            </button>
            <button onClick={() => updateChart("groupedBar")}>
              Grouped Bar
            </button>
            <button onClick={() => updateChart("stackedBar")}>
              Stacked Bar
            </button>
            <button onClick={() => updateChart("normalizedBar")}>
              Normalized Bar
            </button>
            <button onClick={() => updateChart("line")}>
              Line Chart
            </button>
            <button onClick={() => updateChart("area")}>
              Area Chart
            </button>
          </div>

          {/* Data Grid */}
          <div className="data-grid-container">
            <div className="grid-header">
              <h3 className="text-lg font-semibold text-gray-800">
                {activeDataset === 'performance' && 'Quarterly Performance Trends'}
                {activeDataset === 'department' && 'Department Performance Metrics'}
                {activeDataset === 'performers' && 'Top Performers'}
              </h3>
              <p className="text-sm text-gray-600">
                {rowData.length} records loaded
              </p>
            </div>
            <div style={{ height: "400px", width: "100%" }}>
              <AgGridReact
                ref={gridRef}
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                enableCharts={true}
                chartToolPanelsDef={chartToolPanelsDef}
                onGridReady={onGridReady}
                onFirstDataRendered={onFirstDataRendered}
                pagination={true}
                paginationPageSize={10}
              />
            </div>
          </div>

          {/* Chart Container */}
          <div className="chart-container">
            <div className="chart-header">
              <h3 className="text-lg font-semibold text-gray-800">
                {activeDataset === 'performance' && 'Department Performance Over Time'}
                {activeDataset === 'department' && 'Department Comparison'}
                {activeDataset === 'performers' && 'Performance Distribution'}
              </h3>
              <p className="text-sm text-gray-600">
                Interactive visualization - Click chart types above to change view
              </p>
            </div>
            <div id="myChart"></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;