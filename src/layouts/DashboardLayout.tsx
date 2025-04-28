import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  BarChart, 
  PieChart, 
  LineChart, 
  MessageSquare, 
  Users, 
  Menu, 
  X, 
  LogOut, 
  ChevronDown,
  UserCircle
} from 'lucide-react';

const DashboardLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  // Close sidebar when navigating (mobile)
  const handleNavigation = () => {
    setSidebarOpen(false);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          {/* Left section */}
          <div className="flex items-center">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 md:hidden"
            >
              <Menu size={24} />
            </button>
            <div className="ml-4 md:ml-0 flex items-center">
              <BarChart className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-xl font-semibold text-gray-900">Power BI Dashboard</h1>
            </div>
          </div>
          
          {/* Right section - User menu */}
          <div className="relative">
            <button 
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                {user?.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <UserCircle className="w-full h-full text-gray-500" />
                )}
              </div>
              <span className="hidden md:inline-block text-sm font-medium text-gray-700">
                {user?.name}
              </span>
              <ChevronDown size={16} className="text-gray-500" />
            </button>
            
            {/* User dropdown menu */}
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-40 border border-gray-200">
                <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-gray-500">{user?.email}</p>
                  <p className="text-xs mt-1 bg-blue-100 text-blue-800 rounded-full px-2 py-0.5 inline-block capitalize">
                    {user?.role}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <LogOut size={16} className="mr-2" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar for mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div 
              className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity"
              onClick={() => setSidebarOpen(false)}
            ></div>
            <div className="fixed inset-y-0 left-0 flex flex-col max-w-xs w-full bg-white shadow-xl">
              <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
                <div className="flex items-center">
                  <BarChart className="h-8 w-8 text-blue-600" />
                  <h1 className="ml-2 text-xl font-semibold text-gray-900">Power BI</h1>
                </div>
                <button 
                  onClick={() => setSidebarOpen(false)}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
                {renderNavLinks({ handleNavigation })}
              </div>
            </div>
          </div>
        )}
        
        {/* Sidebar for desktop */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
            <div className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
              {renderNavLinks({})}
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

// Navigation links based on user role
interface NavLinksProps {
  handleNavigation?: () => void;
}

const renderNavLinks = ({ handleNavigation = () => {} }: NavLinksProps) => {
  const { user } = useAuth();
  
  return (
    <>
      <NavLink
        to="/dashboard"
        onClick={handleNavigation}
        className={({ isActive }) => 
          `nav-link ${isActive ? 'nav-link-active' : 'text-gray-600 hover:bg-gray-100'}`
        }
      >
        <BarChart size={20} className="mr-3" />
        <span>Dashboard</span>
      </NavLink>
      
      <NavLink
        to="/reports"
        onClick={handleNavigation}
        className={({ isActive }) => 
          `nav-link ${isActive ? 'nav-link-active' : 'text-gray-600 hover:bg-gray-100'}`
        }
      >
        <PieChart size={20} className="mr-3" />
        <span>Standard Reports</span>
      </NavLink>
      
      {/* Advanced user and admin only links */}
      {(user?.role === 'advanced' || user?.role === 'admin') && (
        <>
          <NavLink
            to="/advanced-reports"
            onClick={handleNavigation}
            className={({ isActive }) => 
              `nav-link ${isActive ? 'nav-link-active' : 'text-gray-600 hover:bg-gray-100'}`
            }
          >
            <LineChart size={20} className="mr-3" />
            <span>Advanced Reports</span>
          </NavLink>
          
          <NavLink
            to="/chat-ai"
            onClick={handleNavigation}
            className={({ isActive }) => 
              `nav-link ${isActive ? 'nav-link-active' : 'text-gray-600 hover:bg-gray-100'}`
            }
          >
            <MessageSquare size={20} className="mr-3" />
            <span>AI Assistant</span>
          </NavLink>
        </>
      )}
      
      {/* Admin only links */}
      {user?.role === 'admin' && (
        <NavLink
          to="/admin/users"
          onClick={handleNavigation}
          className={({ isActive }) => 
            `nav-link ${isActive ? 'nav-link-active' : 'text-gray-600 hover:bg-gray-100'}`
          }
        >
          <Users size={20} className="mr-3" />
          <span>User Management</span>
        </NavLink>
      )}
    </>
  );
};

export default DashboardLayout;