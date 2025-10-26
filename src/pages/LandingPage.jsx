import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [showArrow, setShowArrow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowArrow(false);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  const handleGetStartedClick = () => {
    setShowArrow(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 relative">
      {/* Animated Indicator Arrow */}
      {showArrow && (
        <div className="fixed top-20 right-32 z-50 animate-bounce">
          <div className="relative">
            <div className="absolute -top-2 -left-2 w-6 h-6 bg-blue-600 rounded-full animate-ping"></div>
            <div className="relative w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <svg
                className="w-6 h-6 text-white transform -rotate-45"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </div>
            <div className="absolute top-14 -left-4 bg-blue-800 text-white text-sm py-1 px-3 rounded-lg whitespace-nowrap">
              Click Get Started!
            </div>
          </div>
        </div>
      )}

      <header className="bg-white shadow-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <img
                  src="https://factwise.io/images/FWLogos/logo192.png"
                  alt="FactWise Logo"
                  className="w-6 h-6"
                />
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">
                FactWise
              </span>
            </div>
            <div className="flex items-center space-x-4 relative">
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Sign In
              </Link>
              <Link
                to="/dashboard"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium relative z-10"
                onClick={handleGetStartedClick}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Background Image */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 min-h-[100vh] flex items-center">
        {/* Background GIF */}
        <div className="absolute inset-0 z-0">
          <video
            src="https://cdn.pixabay.com/video/2022/04/09/113368-697718069_large.mp4"
            alt="Background Animation"
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        {/* Content */}
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Advanced 
            <span className="text-blue-300 block">Management Dashboard</span>
          </h1>
          <p className="text-xl text-white mb-10 max-w-3xl mx-auto">
            One procurement platform to replace them all.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/dashboard"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-lg shadow-lg"
            >
              Launch Dashboard
            </Link>
            <button className="bg-white text-gray-800 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium text-lg shadow-lg">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Dashboard Previews Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Interactive Dashboard Previews
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See our powerful analytics and visualization tools in action
            </p>
          </div>
          <video
            src="https://cdn.pixabay.com/video/2023/10/14/184941-874460311_large.mp4"
            alt="Dashboard Preview"
            className="mx-auto rounded-lg shadow-xl max-w-full h-auto mb-12"
            autoPlay
            loop
            muted
          />
              <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Advanced data charts
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from a variety of interactive charts to visualize your data 
            </p>
          </div>
          <div className="space-y-12 flex flex-row justify-center">
            <div>
              <img
                src="https://zoomchartswebstorage.blob.core.windows.net/blog/20221130_134210_drill-down-9-levels-pie-chart.gif"
                alt="Dashboard Preview 1"
                className="mx-auto rounded-lg shadow-xl max-w-full h-auto"
              />
            </div>
            <div>
              <img
                src="https://chartmogul.com/blog/wp-content/uploads/2018/01/1-zeroing.gif"
                alt="Dashboard Preview 2"
                className="mx-auto rounded-lg shadow-xl max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage your procurement efficiently
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Advanced Analytics
              </h3>
              <p className="text-gray-600">
                Real-time data visualization with interactive charts and
                comprehensive reporting tools.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Smart Filtering
              </h3>
              <p className="text-gray-600">
                Powerful search and filter capabilities to quickly find and
                analyze procurement data.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Real-time Updates
              </h3>
              <p className="text-gray-600">
                Live data synchronization ensures you always have the most
                up-to-date information.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Procurement Process?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of companies using FactWise to streamline their procurement operations.
          </p>
          <Link
            to="/dashboard"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium text-lg shadow-lg"
          >
            Start Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <img
                    src="https://factwise.io/images/FWLogos/logo192.png"
                    alt="FactWise Logo"
                    className="w-6 h-6"
                  />
                </div>
                <span className="ml-3 text-xl font-bold">FactWise</span>
              </div>
              <p className="text-gray-400 mt-2">
                Advanced Procurement Management Solutions
              </p>
            </div>
            <div className="flex space-x-6">
              <Link
                to="/dashboard"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Dashboard
              </Link>
              <a
                href="#features"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Features
              </a>
              <a
                href="#contact"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FactWise. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;