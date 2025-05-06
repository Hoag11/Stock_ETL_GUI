import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  BarChart3, Home, User, MessageSquare, ShieldCheck, 
  ChevronLeft, LogOut, Menu, X, Settings, Zap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) => 
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
      isActive 
        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' 
        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Top navigation bar */}
      <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
        <div className="px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">PowerBI</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <div className="relative">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                  {user?.username?.[0]?.toUpperCase() || 'U'}
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:inline-block">
                  {user?.username}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar navigation */}
        <aside 
          className={`fixed md:relative inset-y-0 left-0 z-50 transform w-64 bg-white dark:bg-gray-800 shadow-lg md:shadow-none transition-transform duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <div className="flex flex-col h-full pt-5 pb-4">
            <div className="flex-1 px-3 space-y-1">
              <NavLink 
                to="/dashboard" 
                className={navLinkClass}
                onClick={() => setSidebarOpen(false)}
              >
                <Home size={20} />
                <span>Dashboard</span>
              </NavLink>
              <NavLink 
                to="/ai-chat" 
                className={navLinkClass}
                onClick={() => setSidebarOpen(false)}
              >
                <MessageSquare size={20} />
                <span>AI Chat</span>
              </NavLink>
              <NavLink 
                to="/profile" 
                className={navLinkClass}
                onClick={() => setSidebarOpen(false)}
              >
                <User size={20} />
                <span>Profile</span>
              </NavLink>
              {user?.role !== 'ADVANCED' && (
                <NavLink 
                  to="/upgrade" 
                  className={navLinkClass}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Zap size={20} />
                  <span>Upgrade</span>
                </NavLink>
              )}
              {user?.role === 'ADMIN' && (
                <NavLink 
                  to="/admin" 
                  className={navLinkClass}
                  onClick={() => setSidebarOpen(false)}
                >
                  <ShieldCheck size={20} />
                  <span>Admin Panel</span>
                </NavLink>
              )}
            </div>
            <div className="px-3 py-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
              >
                <LogOut size={20} />
                <span>Log out</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main content area */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;