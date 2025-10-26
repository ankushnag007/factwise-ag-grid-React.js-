"use client";
import React, { useState, useMemo, useRef } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useEmployees } from "../hooks/useEmployees";
import { useSelector } from "react-redux";

ModuleRegistry.registerModules([AllCommunityModule]);

const EmployeeGrid = () => {
  const { data: employees = [], isLoading, error } = useEmployees();
  const { filters } = useSelector((state) => state.employees);
  const gridRef = useRef(null);

  const filteredEmployees = useMemo(() => {
    if (!employees || employees.length === 0) return [];

    return employees.filter((employee) => {
      if (filters.department && employee.department !== filters.department)
        return false;
      if (filters.location && employee.location !== filters.location)
        return false;
      if (
        filters.isActive !== "" &&
        employee.isActive !== (filters.isActive === "true")
      )
        return false;
      return true;
    });
  }, [employees, filters]);

  // Column Definitions
  const [colDefs] = useState([
    {
      field: "id",
      headerName: "ID",
      width: 80,
      filter: true,
    },
    {
      field: "firstName",
      headerName: "First Name",
      width: 120,
      filter: true,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 120,
      filter: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      filter: true,
    },
    {
      field: "department",
      headerName: "Department",
      width: 130,
      filter: true,
    },
    {
      field: "position",
      headerName: "Position",
      width: 150,
      filter: true,
    },
    {
      field: "salary",
      headerName: "Salary",
      width: 120,
      filter: true,
      valueFormatter: (params) => `$${params.value?.toLocaleString() || "0"}`,
    },
    {
      field: "location",
      headerName: "Location",
      width: 120,
      filter: true,
    },
    {
      field: "isActive",
      headerName: "Active",
      width: 100,
      filter: true,
      valueFormatter: (params) => (params.value ? "Yes" : "No"),
    },
  ]);

  const defaultColDef = {
    flex: 1,
    sortable: true,
    filter: true,
    resizable: true,
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading employees...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error loading employee data: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">
          Employee Data ({filteredEmployees.length} employees)
        </h3>
      </div>
      
      <div className="p-4">
        <div 
          className="ag-theme-alpine w-full"
          style={{ height: "500px" }}
        >
          <AgGridReact
            ref={gridRef}
            rowData={filteredEmployees}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
            pagination={true}
            paginationPageSize={10}
          />
        </div>
      </div>
      
    </div>
  );
};

export default EmployeeGrid;