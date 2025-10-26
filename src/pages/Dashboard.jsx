import React from "react";
import Header from "../components/Header";
import DashboardStats from "../components/DashboardStats";
import EmployeeFilters from "../components/EmployeeFilters";
import EmployeeGrid from "../components/EmployeeGrid";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Employee Dashboard
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Advanced employee management system with real-time analytics and workforce insights
          </p>
        </div>
        <DashboardStats />
        <EmployeeFilters />
        <EmployeeGrid />
      </main>
    </div>
  );
};

export default Dashboard;