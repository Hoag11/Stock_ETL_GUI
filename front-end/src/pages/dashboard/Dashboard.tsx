import React, { useState } from 'react';
import { ArrowRight, Calendar, TrendingUp, Users, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import SalesChart from '../../components/charts/SalesChart';
import UserActivityChart from '../../components/charts/UserActivityChart';
import StatCard from '../../components/ui/StatCard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'year'>('month');
  
  const isAdvancedUser = user?.role === 'ADVANCED' || user?.role === 'ADMIN';

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Welcome back, {user?.username}!
          </p>
        </div>
        
        <div className="inline-flex items-center rounded-md shadow-sm">
          <button
            onClick={() => setTimeRange('day')}
            className={`px-4 py-2 text-sm font-medium rounded-l-md ${
              timeRange === 'day'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
            } border border-gray-200 dark:border-gray-600`}
          >
            Day
          </button>
          <button
            onClick={() => setTimeRange('week')}
            className={`px-4 py-2 text-sm font-medium ${
              timeRange === 'week'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
            } border-t border-b border-gray-200 dark:border-gray-600`}
          >
            Week
          </button>
          <button
            onClick={() => setTimeRange('month')}
            className={`px-4 py-2 text-sm font-medium ${
              timeRange === 'month'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
            } border-t border-b border-gray-200 dark:border-gray-600`}
          >
            Month
          </button>
          <button
            onClick={() => setTimeRange('year')}
            className={`px-4 py-2 text-sm font-medium rounded-r-md ${
              timeRange === 'year'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
            } border border-gray-200 dark:border-gray-600`}
          >
            Year
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Users" 
          value="3,721" 
          change="+12.4%" 
          isIncrease={true} 
          icon={<Users className="h-6 w-6" />} 
        />
        <StatCard 
          title="Total Views" 
          value="45,871" 
          change="+24.3%" 
          isIncrease={true} 
          icon={<TrendingUp className="h-6 w-6" />} 
        />
        <StatCard 
          title="Avg. Session" 
          value="18m 45s" 
          change="-2.8%" 
          isIncrease={false} 
          icon={<Calendar className="h-6 w-6" />} 
        />
        <StatCard 
          title="Conversion" 
          value="3.42%" 
          change="+8.7%" 
          isIncrease={true} 
          icon={<Zap className="h-6 w-6" />} 
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Sales Overview</h2>
            {!isAdvancedUser && (
              <div className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded flex items-center">
                <Zap className="h-3 w-3 mr-1" />
                Upgrade for full analytics
              </div>
            )}
          </div>
          <SalesChart timeRange={timeRange} isAdvancedUser={isAdvancedUser} />
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">User Activity</h2>
          </div>
          <UserActivityChart timeRange={timeRange} />
          
          <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Top Sources</h3>
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span className="text-gray-700 dark:text-gray-300">Direct</span>
                <span className="font-medium text-gray-900 dark:text-white">45%</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-700 dark:text-gray-300">Organic Search</span>
                <span className="font-medium text-gray-900 dark:text-white">32%</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-700 dark:text-gray-300">Referral</span>
                <span className="font-medium text-gray-900 dark:text-white">18%</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-700 dark:text-gray-300">Social</span>
                <span className="font-medium text-gray-900 dark:text-white">5%</span>
              </li>
            </ul>
          </div>
        </div>
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