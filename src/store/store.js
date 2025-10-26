import { configureStore } from '@reduxjs/toolkit';
import employeesSlice from './employeesSlice';

export const store = configureStore({
  reducer: {
    employees: employeesSlice,
  },
});

export default store;