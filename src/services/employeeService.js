// src/services/employeeService.js
import { employeesData } from '../data/employees';

export const employeeService = {
  getEmployees: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(employeesData);
      }, 500);
    });
  },
};