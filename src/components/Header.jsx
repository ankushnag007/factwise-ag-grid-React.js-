import { User } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                              <img src='https://factwise.io/images/FWLogos/logo192.png' alt='FactWise Logo' className='w-6 h-6' />

              </div>
              <span className="ml-3 text-xl font-bold text-gray-900 hidden sm:block">
                FactWise
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link
              to="/dashboard"
              className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                isActive('/dashboard') 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/analytics"
              className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                isActive('/analytics') 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Analytics
            </Link>
            <Link
              to="/reports"
              className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                isActive('/reports') 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Reports
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                <img src='https://avatars.githubusercontent.com/u/69753708?v=4' alt='FactWise Logo' className='w-6 h-6 rounded-full' />

              </div>
              <span className="text-sm font-medium text-gray-700">Ankush N</span>
            </div>
          </div>

          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <span 
                  className={`block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                    isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                  }`}
                ></span>
                <span 
                  className={`block h-0.5 w-6 bg-current transition duration-300 ease-in-out ${
                    isMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                ></span>
                <span 
                  className={`block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                    isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div 
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMenuOpen ? 'max-h-96 opacity-100 py-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
            <Link
              to="/dashboard"
              className={`block px-3 py-2 text-base font-medium rounded-lg transition-colors duration-200 ${
                isActive('/dashboard')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/analytics"
              className={`block px-3 py-2 text-base font-medium rounded-lg transition-colors duration-200 ${
                isActive('/analytics')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Analytics
            </Link>
            <Link
              to="/reports"
              className={`block px-3 py-2 text-base font-medium rounded-lg transition-colors duration-200 ${
                isActive('/reports')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Reports
            </Link>
            
            {/* Mobile User Info */}
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex items-center px-3 py-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                            <img src='https://lh3.googleusercontent.com/a/ACg8ocLzuw6wD16cLqdaDcVZ-LD2XXI_j5lwKmXpqok8b-qRVMGCsC8=s288-c-no' alt='FactWise Logo' className='w-6 h-6 rounded-full' />

                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Admin User</p>
                  <p className="text-xs text-gray-500">admin@factwise.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;