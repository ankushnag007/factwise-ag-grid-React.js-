import React from "react";
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import store from './store/store';
import EmployeeGrid from "./components/EmployeeGrid";
import EmployeeFilters from "./components/EmployeeFilters";
import DashboardStats from "./components/DashboardStats";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-gray-100 p-8">
          <div className="max-w-7xl mx-auto">
            <header className="mb-8 text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Employee Dashboard
              </h1>
              <p className="text-lg text-gray-600">
                Dynamic AG Grid with Filters and Real-time Stats
              </p>
            </header>
            
            <DashboardStats />
            <EmployeeFilters />
            <EmployeeGrid />
          </div>
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
};

export default App;