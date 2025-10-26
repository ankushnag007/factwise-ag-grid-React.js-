import { useQuery } from '@tanstack/react-query';
import { employeeService } from '../services/employeeService';

export const useEmployees = () => {
  return useQuery({
    queryKey: ['employees'],
    queryFn: employeeService.getEmployees,
    staleTime: 5 * 60 * 1000,
  });
};