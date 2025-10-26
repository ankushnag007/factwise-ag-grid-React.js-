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
      field: "age",
      headerName: "Age",
      width: 100,
      filter: true,
    },
    {
      field: "location",
      headerName: "Location",
      width: 120,
      filter: true,
    },
    {
      field: "performanceRating",
      headerName: "Performance",
      width: 120,
      filter: true,
      valueFormatter: (params) => params.value?.toFixed(1) || "0.0",
    },
    {
      field: "projectsCompleted",
      headerName: "Projects",
      width: 100,
      filter: true,
    },
    {
      field: "isActive",
      headerName: "Active",
      width: 100,
      filter: true,
      valueFormatter: (params) => (params.value ? "Yes" : "No"),
    },
    {
      field: "manager",
      headerName: "Manager",
      width: 150,
      filter: true,
    },
  ]);

  const defaultColDef = {
    flex: 1,
    sortable: true,
    filter: true,
    resizable: true,
    floatingFilter: true,
  };

  if (isLoading) {
    return (
      <div className="p-4 bg-white rounded-lg shadow">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-white rounded-lg shadow">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error loading employee data: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-500">
          {filters.department && `Department: ${filters.department} `}
          {filters.location && `Location: ${filters.location} `}
          {filters.isActive &&
            `Status: ${filters.isActive === "true" ? "Active" : "Inactive"}`}
        </div>
      </div>

      {/* AG Grid */}
      <div style={{ width: "auto", height: 500 }}>
        <AgGridReact
          ref={gridRef}
          rowData={filteredEmployees}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={10}
          onPaginationChanged={(params) => {
            const currentPage = params.api.paginationGetCurrentPage() + 1;
            const totalPages = params.api.paginationGetTotalPages();
            const currentPageElement = document.getElementById("current-page");
            if (currentPageElement) {
              currentPageElement.textContent = `${currentPage} of ${totalPages}`;
            }

            const firstButton = document.querySelector(
              'button[title="First Page"]'
            );
            const prevButton = document.querySelector(
              'button[title="Previous Page"]'
            );
            const nextButton = document.querySelector(
              'button[title="Next Page"]'
            );
            const lastButton = document.querySelector(
              'button[title="Last Page"]'
            );

            if (firstButton && prevButton) {
              const disabled = currentPage === 1;
              firstButton.disabled = disabled;
              prevButton.disabled = disabled;
            }

            if (nextButton && lastButton) {
              const disabled = currentPage === totalPages;
              nextButton.disabled = disabled;
              lastButton.disabled = disabled;
            }
          }}
          onGridReady={(params) => {
            console.log(
              "AG Grid ready with",
              filteredEmployees.length,
              "filtered employees"
            );
            params.api.paginationGoToPage(0);
          }}
        />
      </div>

      <div className="flex justify-between items-center mt-4 p-3 bg-gray-50 rounded-lg">
        <div className="text-sm text-gray-600">
          Showing page <span id="bottom-current-page">1</span> of{" "}
          <span id="bottom-total-pages">1</span>
        </div>
      </div>
    </div>
  );
};

export default EmployeeGrid;
