import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BarChart } from 'lucide-react';

const AuthLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Branding section */}
      <div className="bg-primary-950 text-white w-full md:w-1/2 p-8 flex flex-col justify-center items-center">
        <div className="max-w-md mx-auto p-6 space-y-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white/10 p-3 rounded-full">
              <BarChart size={40} className="text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">Power BI Dashboard</h1>
          <p className="text-lg text-gray-300">
            Access your business intelligence reports with our intuitive dashboard system
          </p>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Real-time Analytics</h3>
              <p className="text-sm text-gray-300">Stay up-to-date with your latest business metrics</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">AI-Powered Insights</h3>
              <p className="text-sm text-gray-300">Get intelligent recommendations based on your data</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Custom Reports</h3>
              <p className="text-sm text-gray-300">View reports tailored to your specific needs</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Secure Access</h3>
              <p className="text-sm text-gray-300">Role-based permissions to protect sensitive data</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Auth content */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;