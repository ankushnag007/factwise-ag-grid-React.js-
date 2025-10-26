import React from 'react';
import { useEmployees } from '../hooks/useEmployees';
import { useSelector } from 'react-redux';
import Header from './Header';
import EmployeeFilters from './EmployeeFilters';
import EmployeeGrid from './EmployeeGrid';
import Footer from './Footer';

const DashboardStats = () => {
  const { data: employees = [] } = useEmployees();
  const { filters } = useSelector((state) => state.employees);

  const filteredEmployees = employees.filter(employee => {
    if (filters.department && employee.department !== filters.department) return false;
    if (filters.location && employee.location !== filters.location) return false;
    if (filters.isActive !== '' && employee.isActive !== (filters.isActive === 'true')) return false;
    return true;
  });

  const totalEmployees = filteredEmployees.length;
  const activeEmployees = filteredEmployees.filter(emp => emp.isActive).length;
  const avgSalary = totalEmployees > 0 
    ? Math.round(filteredEmployees.reduce((sum, emp) => sum + emp.salary, 0) / totalEmployees)
    : 0;
  const avgPerformance = totalEmployees > 0
    ? filteredEmployees.reduce((sum, emp) => sum + emp.performanceRating, 0) / totalEmployees
    : 0;

  const stats = [
    {
      title: 'Total Employees',
      value: totalEmployees,
      color: 'bg-blue-500',
      icon: '👥',
    },
    {
      title: 'Active Employees',
      value: activeEmployees,
      color: 'bg-green-500',
      icon: '✅',
    },
    {
      title: 'Avg Salary',
      value: `$${avgSalary.toLocaleString()}`,
      color: 'bg-purple-500',
      icon: '💰',
    },
    {
      title: 'Avg Performance',
      value: avgPerformance.toFixed(1),
      color: 'bg-orange-500',
      icon: '⭐',
    },
  ];

  return (
    <>
    <Header />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 mt-10">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-600 text-sm font-medium uppercase tracking-wide">
                {stat.title}
              </h3>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {stat.value}
              </p>
            </div>
            <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
              <span className="text-white text-xl">
                {stat.icon}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
    <EmployeeFilters />
    <EmployeeGrid  />
    <Footer />
  </>
  );
};

export default DashboardStats;