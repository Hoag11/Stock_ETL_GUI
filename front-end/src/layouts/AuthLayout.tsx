import React from 'react';
import { Outlet } from 'react-router-dom';
import { BarChart3 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const AuthLayout: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950">
      {/* Left side branding section */}
      <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center items-center">
        <div className="mb-6 flex items-center">
          <BarChart3 className="w-12 h-12 text-blue-600 dark:text-blue-400" />
          <h1 className="ml-2 text-3xl font-bold text-blue-800 dark:text-white">PowerBI</h1>
        </div>
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-gray-100">
            Advanced Analytics Platform
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Transform your data into actionable insights with our powerful analytics and AI-driven platform.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-blue-700 dark:text-blue-400">Data Visualization</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Interactive charts and dashboards</p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-blue-700 dark:text-blue-400">AI Insights</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Advanced AI analytics</p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-blue-700 dark:text-blue-400">Real-time Data</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Live updates and monitoring</p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-blue-700 dark:text-blue-400">Collaboration</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Team dashboards and sharing</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side auth form section */}
      <div className="w-full md:w-1/2 bg-white dark:bg-gray-800 p-6 md:p-12 flex items-center justify-center rounded-t-3xl md:rounded-none md:rounded-l-3xl shadow-lg">
        <div className="w-full max-w-md">
          <div className="flex justify-end mb-6">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;