import React, { useState, useEffect } from 'react';
import { ArrowRight, Calendar, TrendingUp, Users, Zap, RefreshCw, MessageSquare, ExternalLink, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'year'>('month');
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'basic' | 'advanced'>(
    user?.role === 'ADVANCED_USER' || user?.role === 'ADMIN' ? 'advanced' : 'basic'
  );
  
  const isAdvancedUser = user?.role === 'ADVANCED_USER' || user?.role === 'ADMIN';
  const isAdmin = user?.role === 'ADMIN';

  // PowerBI dashboard URLs based on user role
  const basicDashboardUrl = "https://app.powerbi.com/reportEmbed?reportId=a3af0523-3d68-42c6-a61b-e2ffbb8f6421&autoAuth=true&ctid=e7572e92-7aee-4713-a3c4-ba64888ad45f";
  const advancedDashboardUrl = "https://app.powerbi.com/reportEmbed?reportId=396b737c-4a8e-4110-bbc0-138374db891c&autoAuth=true&ctid=e7572e92-7aee-4713-a3c4-ba64888ad45f";

  // Get current dashboard URL based on user role or admin view selection
  const getDashboardUrl = () => {
    if (isAdmin && viewMode === 'basic') {
      return basicDashboardUrl;
    }
    
    return isAdvancedUser ? advancedDashboardUrl : basicDashboardUrl;
  };

  useEffect(() => {
    // Reset loading state when changing dashboard
    setIsLoading(true);
  }, [viewMode]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Welcome back, {user?.username}!
          </p>
        </div>
        
        {isAdmin && (
          <div className="inline-flex items-center rounded-md shadow-sm">
            <button
              onClick={() => setViewMode('basic')}
              className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                viewMode === 'basic'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
              } border border-gray-200 dark:border-gray-600`}
            >
              Basic View
            </button>
            <button
              onClick={() => setViewMode('advanced')}
              className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                viewMode === 'advanced'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
              } border border-gray-200 dark:border-gray-600`}
            >
              Advanced View
            </button>
          </div>
        )}
      </div>
      
      {/* Telegram Link Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border-l-4 border-blue-500">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full mr-4">
              <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Báo giá hàng ngày</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Tham gia nhóm Telegram để nhận báo giá HPG, VNM, FPT hàng ngày
              </p>
            </div>
          </div>
          <a 
            href="https://t.me/+_EnUuDnldM00ZGU9" 
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium flex items-center transition-colors"
          >
            Tham gia <ExternalLink className="ml-1 h-4 w-4" />
          </a>
        </div>
      </div>
      
      {/* PowerBI Dashboard */}
      <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow">
        {isLoading && (
          <div className="flex items-center justify-center p-8">
            <RefreshCw className="animate-spin h-6 w-6 mr-3 text-blue-600" />
            <p className="text-gray-700 dark:text-gray-300">Loading your dashboard...</p>
          </div>
        )}
        
        <div className="w-full" style={{ height: 'calc(100vh - 280px)', minHeight: '541px' }}>
          <iframe 
            title={isAdvancedUser ? "Advanced Dashboard" : "Basic Dashboard"}
            width="100%" 
            height="100%" 
            src={getDashboardUrl()}
            frameBorder="0" 
            allowFullScreen={true}
            style={{ display: isLoading ? 'none' : 'block' }}
            onLoad={() => setIsLoading(false)}
          />
        </div>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-start">
            <div className="text-sm text-gray-600 dark:text-gray-400 flex-1">
              <span className="font-medium text-gray-900 dark:text-gray-100 mr-2">
                {isAdvancedUser ? 'Advanced Analytics Dashboard' : 'Standard Analytics Dashboard'}
              </span>
              {!isAdvancedUser && 'Upgrade to access advanced features and insights.'}
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => setIsLoading(true)}
                className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
              >
                <RefreshCw className="h-3.5 w-3.5 mr-1" /> Refresh
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Dashboard Tips */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
        <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Dashboard Tips:</h3>
        <ul className="list-disc ml-5 space-y-1 text-sm text-blue-700 dark:text-blue-400">
          <li>Click on any chart to filter the other visualizations</li>
          <li>Use the top filters for different data views</li>
          <li>Press ESC to reset all filters</li>
          <li>Theo dõi <a href="https://t.me/+_EnUuDnldM00ZGU9" target="_blank" rel="noopener noreferrer" className="font-medium underline">nhóm Telegram</a> để nhận thông tin cập nhật giá HPG, VNM, FPT</li>
          {isAdvancedUser && (
            <li>Export data and reports using the options in each visualization</li>
          )}
        </ul>
      </div>
      
      {!isAdvancedUser && (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow p-6 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold">Unlock Advanced Analytics</h2>
              <p className="mt-1 text-blue-100">Get access to full reports, AI-powered insights, and premium features.</p>
            </div>
            <a 
              href="/upgrade"
              className="px-6 py-2 bg-white text-blue-600 rounded-md font-medium flex items-center hover:bg-blue-50 transition-colors"
            >
              Upgrade Now <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
