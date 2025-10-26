"use client";
import React, { useMemo, useRef, useState, useCallback, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import Header from "../components/Header";
import Footer from "../components/Footer";

ModuleRegistry.registerModules([AllCommunityModule]);

const REPORT_CONFIGS = {
  performance: {
    title: "Performance Reports",
    description: "Employee performance metrics and trend analysis",
    columns: [
      { field: "id", headerName: "ID", width: 80, filter: true },
      { field: "reportName", headerName: "Report Name", width: 250, filter: true },
      { field: "period", headerName: "Period", width: 120, filter: true },
      { field: "department", headerName: "Department", width: 150, filter: true },
      { field: "avgPerformance", headerName: "Avg Performance", width: 130, valueFormatter: (p) => p.value?.toFixed(1) || '0.0' },
      { field: "projectsCompleted", headerName: "Projects", width: 100 },
      { field: "status", headerName: "Status", width: 120, filter: true },
      { field: "generatedDate", headerName: "Generated", width: 120, filter: true },
      { field: "downloadCount", headerName: "Downloads", width: 100 }
    ]
  },
  department: {
    title: "Department Reports",
    description: "Department-wise analytics and comparisons",
    columns: [
      { field: "id", headerName: "ID", width: 80, filter: true },
      { field: "reportName", headerName: "Report Name", width: 250, filter: true },
      { field: "department", headerName: "Department", width: 150, filter: true },
      { field: "performance", headerName: "Performance", width: 120, valueFormatter: (p) => p.value?.toFixed(1) || '0.0' },
      { field: "productivity", headerName: "Productivity %", width: 130 },
      { field: "turnover", headerName: "Turnover %", width: 120 },
      { field: "status", headerName: "Status", width: 120, filter: true },
      { field: "generatedDate", headerName: "Generated", width: 120, filter: true },
      { field: "downloadCount", headerName: "Downloads", width: 100 }
    ]
  },
  analytics: {
    title: "Analytics Reports",
    description: "Advanced analytics and insights",
    columns: [
      { field: "id", headerName: "ID", width: 80, filter: true },
      { field: "reportName", headerName: "Report Name", width: 280, filter: true },
      { field: "type", headerName: "Analysis Type", width: 150, filter: true },
      { field: "dataPoints", headerName: "Data Points", width: 120 },
      { field: "coverage", headerName: "Coverage %", width: 120 },
      { field: "status", headerName: "Status", width: 120, filter: true },
      { field: "generatedDate", headerName: "Generated", width: 120, filter: true },
      { field: "downloadCount", headerName: "Downloads", width: 100 }
    ]
  }
};

// Base reports data - moved outside component
const BASE_REPORTS_DATA = [
  // Performance Reports
  {
    id: 1, reportName: "Quarterly Performance Trends", type: "Performance", 
    period: "Q1-Q4 2024", department: "All", avgPerformance: 4.6, 
    projectsCompleted: 1114, status: "Completed", generatedDate: "2024-01-15", downloadCount: 45
  },
  {
    id: 2, reportName: "Engineering Performance Analysis", type: "Performance", 
    period: "2024", department: "Engineering", avgPerformance: 4.7, 
    projectsCompleted: 289, status: "Completed", generatedDate: "2024-01-12", downloadCount: 32
  },
  {
    id: 3, reportName: "Sales Team Performance", type: "Performance", 
    period: "Q4 2024", department: "Sales", avgPerformance: 4.7, 
    projectsCompleted: 312, status: "Completed", generatedDate: "2024-01-10", downloadCount: 28
  },
  {
    id: 4, reportName: "Annual Performance Review", type: "Performance", 
    period: "2024", department: "All", avgPerformance: 4.6, 
    projectsCompleted: 1114, status: "In Progress", generatedDate: "2024-01-08", downloadCount: 0
  },

  {
    id: 5, reportName: "Department Performance Comparison", type: "Department", 
    department: "All", performance: 4.7, productivity: 89, turnover: 9, 
    status: "Completed", generatedDate: "2024-01-07", downloadCount: 38
  },
  {
    id: 6, reportName: "HR Department Analytics", type: "Department", 
    department: "HR", performance: 4.7, productivity: 89, turnover: 6, 
    status: "Completed", generatedDate: "2024-01-05", downloadCount: 22
  },
  {
    id: 7, reportName: "Finance Team Metrics", type: "Department", 
    department: "Finance", performance: 4.8, productivity: 91, turnover: 5, 
    status: "Completed", generatedDate: "2024-01-03", downloadCount: 19
  },

  // Analytics Reports
  {
    id: 8, reportName: "Employee Satisfaction Correlation", type: "Analytics", 
    dataPoints: 2450, coverage: 95, status: "Completed", generatedDate: "2024-01-02", downloadCount: 67
  },
  {
    id: 9, reportName: "Performance Prediction Model", type: "Analytics", 
    dataPoints: 1890, coverage: 88, status: "In Progress", generatedDate: "2024-01-01", downloadCount: 0
  },
  {
    id: 10, reportName: "Turnover Risk Analysis", type: "Analytics", 
    dataPoints: 3120, coverage: 92, status: "Completed", generatedDate: "2023-12-28", downloadCount: 89
  }
];

const Reports = () => {
  const gridRef = useRef(null);
  const [rowData, setRowData] = useState([]);
  const [activeReportType, setActiveReportType] = useState('performance');
  const [isGenerating, setIsGenerating] = useState(false);

  const columnDefs = useMemo(() => [
    ...REPORT_CONFIGS[activeReportType].columns,
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      cellRenderer: (params) => (
        <div className="flex space-x-2">
          <button 
            className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors font-medium"
            onClick={() => handleDownload(params.data)}
          >
            Download
          </button>
          <button 
            className="px-3 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700 transition-colors font-medium"
            onClick={() => handleView(params.data)}
          >
            View
          </button>
        </div>
      ),
      filter: false,
      sortable: false
    }
  ], [activeReportType]);

  const defaultColDef = useMemo(() => ({
    flex: 1,
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 100,
  }), []);

  const filterReportsByType = useCallback((type) => {
    return BASE_REPORTS_DATA.filter(report => {
      if (type === 'performance') return report.type === 'Performance';
      if (type === 'department') return report.type === 'Department';
      if (type === 'analytics') return report.type === 'Analytics';
      return true;
    });
  }, []);

  const loadReports = useCallback((type = 'performance') => {
    const data = filterReportsByType(type);
    setRowData(data);
    setActiveReportType(type);
  }, [filterReportsByType]);

  useEffect(() => {
    loadReports('performance');
  }, [loadReports]);

  const handleDownload = useCallback((report) => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' }));
    link.download = `${report.reportName.replace(/\s+/g, '_')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setRowData(prev => prev.map(r => 
      r.id === report.id ? { ...r, downloadCount: r.downloadCount + 1 } : r
    ));
  }, []);

  const handleView = useCallback((report) => {
    alert(`Opening: ${report.reportName}\n\nThis would open the report in a detailed view with charts and analysis.`);
  }, []);

  const handleGenerateReport = useCallback(() => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const newReport = {
        id: Date.now(), 
        reportName: `Custom ${REPORT_CONFIGS[activeReportType].title} - ${new Date().toLocaleDateString()}`,
        type: activeReportType === 'performance' ? 'Performance' : 
              activeReportType === 'department' ? 'Department' : 'Analytics',
        period: "Q1 2024",
        department: "All",
        avgPerformance: 4.5 + Math.random() * 0.5,
        projectsCompleted: Math.floor(Math.random() * 100) + 200,
        status: "Completed",
        generatedDate: new Date().toISOString().split('T')[0],
        downloadCount: 0
      };
      
      setRowData(prev => [newReport, ...prev]);
      setIsGenerating(false);
    }, 1500);
  }, [activeReportType]);

  const handleExportAll = useCallback(() => {
    const dataStr = JSON.stringify(rowData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `all_reports_${activeReportType}.json`;
    link.click();
  }, [rowData, activeReportType]);

  const handleScheduleReport = useCallback(() => {
    alert(`Scheduling ${REPORT_CONFIGS[activeReportType].title}...\n\nThis would open a scheduling dialog for automated report generation.`);
  }, [activeReportType]);

  // Memoized statistics calculation
  const stats = useMemo(() => {
    const totalReports = rowData.length;
    const completedReports = rowData.filter(r => r.status === 'Completed').length;
    const totalDownloads = rowData.reduce((sum, report) => sum + report.downloadCount, 0);
    const avgPerformance = rowData.length > 0 
      ? (rowData.reduce((sum, report) => sum + (report.avgPerformance || report.performance || 0), 0) / rowData.length).toFixed(1)
      : '0.0';

    return { totalReports, completedReports, totalDownloads, avgPerformance };
  }, [rowData]);

  const reportTypeButtons = useMemo(() => 
    Object.entries(REPORT_CONFIGS).map(([key, config]) => (
      <button
        key={key}
        onClick={() => loadReports(key)}
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
          activeReportType === key
            ? 'bg-blue-600 text-white'
            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
        }`}
      >
        {config.title}
      </button>
    ))
  , [activeReportType, loadReports]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Reports Dashboard
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            {REPORT_CONFIGS[activeReportType].description}
          </p>
        </div>

        {/* Report Type Selector */}
        <div className="mb-6 flex flex-wrap gap-2">
          {reportTypeButtons}
        </div>

        {/* Action Buttons */}
        <div className="mb-6 flex flex-wrap gap-4">
          <button
            onClick={handleGenerateReport}
            disabled={isGenerating}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors font-medium flex items-center gap-2"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Generating...
              </>
            ) : (
              'Generate New Report'
            )}
          </button>
          <button 
            onClick={handleScheduleReport}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Schedule Report
          </button>
          <button 
            onClick={handleExportAll}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            Export All
          </button>
        </div>

        <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-600 text-sm font-medium">Total Reports</h3>
                <p className="text-2xl font-bold text-gray-900">{stats.totalReports}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-lg">📊</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-600 text-sm font-medium">Completed</h3>
                <p className="text-2xl font-bold text-gray-900">{stats.completedReports}</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 text-lg">✅</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-600 text-sm font-medium">Total Downloads</h3>
                <p className="text-2xl font-bold text-gray-900">{stats.totalDownloads}</p>
              </div>
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-orange-600 text-lg">📥</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-600 text-sm font-medium">Avg Performance</h3>
                <p className="text-2xl font-bold text-gray-900">{stats.avgPerformance}</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 text-lg">⭐</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {REPORT_CONFIGS[activeReportType].title}
                </h3>
                <p className="text-sm text-gray-600">
                  {rowData.length} reports available • Click actions to download or view
                </p>
              </div>
              <div className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>
          
          <div className="p-4">
            <div className="ag-theme-alpine" style={{ height: "500px", width: "100%" }}>
              <AgGridReact
                ref={gridRef}
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                pagination={true}
                paginationPageSize={10}
                domLayout="normal"
                suppressColumnVirtualisation={true}
                suppressRowVirtualisation={false}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />

    </div>
  );
};

export default Reports;