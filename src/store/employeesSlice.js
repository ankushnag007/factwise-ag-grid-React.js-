import { createSlice } from '@reduxjs/toolkit';

const employeesSlice = createSlice({
  name: 'employees',
  initialState: {
    filters: {
      department: '',
      location: '',
      isActive: '',
    },
  },
  reducers: {
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        department: '',
        location: '',
        isActive: '',
      };
    },
  },
});

export const { setFilter, clearFilters } = employeesSlice.actions;
export default employeesSlice.reducer;