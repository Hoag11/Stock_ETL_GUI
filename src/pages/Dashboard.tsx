import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { PieChart, BarChart, TrendingUp, Users } from 'lucide-react';
import axiosInstance from '../api/axiosInstance'; // import axiosInstance

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [reportUrl, setReportUrl] = useState<string>('');

  useEffect(() => {
    const fetchReportUrl = async () => {
      try {
        const response = await axiosInstance.get('/powerbi/url');
        setReportUrl(response.data.url);
      } catch (error) {
        console.error('Failed to fetch Power BI report URL', error);
      }
    };

    fetchReportUrl();
  }, []);

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back, {user?.name}. Here's your business intelligence overview.
        </p>
      </div>

      {/* Dashboard stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <DashboardStat 
          title="Total Sales" 
          value="$124,592" 
          trend="+12.5%" 
          trendType="up"
          icon={<TrendingUp size={20} className="text-blue-500" />}
        />
        <DashboardStat 
          title="Active Users" 
          value="1,275" 
          trend="+3.7%" 
          trendType="up"
          icon={<Users size={20} className="text-green-500" />}
        />
        <DashboardStat 
          title="Conversion Rate" 
          value="4.6%" 
          trend="-0.8%" 
          trendType="down"
          icon={<PieChart size={20} className="text-purple-500" />}
        />
        <DashboardStat 
          title="Avg. Order Value" 
          value="$97.14" 
          trend="+2.3%" 
          trendType="up"
          icon={<BarChart size={20} className="text-orange-500" />}
        />
      </div>

      {/* Main dashboard content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Sales Overview</h2>
              <select className="text-sm border rounded-md px-2 py-1">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 h-96 flex items-center justify-center border border-gray-200">
              {reportUrl ? (
                <iframe
                  title="Power BI Report"
                  width="100%"
                  height="100%"
                  src={reportUrl}
                  frameBorder="0"
                  allowFullScreen
                  className="rounded-md shadow-md"
                />
              ) : (
                <p className="text-gray-500">Loading report...</p>
              )}
            </div>
          </div>
        </div>

        {/* Top Products section giữ nguyên */}
        <div>
          <div className="card h-full">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Products</h2>
            <div className="space-y-4">
              {['Product A', 'Product B', 'Product C', 'Product D', 'Product E'].map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full bg-blue-${500 - index * 100}`}></div>
                    <span className="ml-2 text-gray-700">{product}</span>
                  </div>
                  <span className="font-medium">${Math.floor(Math.random() * 10000)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent activity giữ nguyên */}
      <div className="mt-6">
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { date: '2025-05-10', user: 'John Smith', action: 'Viewed Report', details: 'Sales Performance Q1' },
                  { date: '2025-05-09', user: 'Emily Chen', action: 'Created Report', details: 'Customer Satisfaction' },
                  { date: '2025-05-08', user: 'Alex Turner', action: 'Exported Data', details: 'Marketing Metrics CSV' },
                  { date: '2025-05-07', user: 'Sarah Johnson', action: 'Shared Report', details: 'Revenue Forecast with Finance Team' },
                ].map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{item.date}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{item.user}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{item.action}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{item.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
};

interface DashboardStatProps {
  title: string;
  value: string;
  trend: string;
  trendType: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
}

const DashboardStat: React.FC<DashboardStatProps> = ({ title, value, trend, trendType, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
      <div className="flex justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="mt-2">
        <span
          className={`text-xs font-medium ${
            trendType === 'up'
              ? 'text-green-600 bg-green-100'
              : trendType === 'down'
              ? 'text-red-600 bg-red-100'
              : 'text-gray-600 bg-gray-100'
          } px-2 py-1 rounded-full`}
        >
          {trend}
        </span>
        <span className="text-xs text-gray-500 ml-1">vs previous period</span>
      </div>
    </div>
  );
};

export default Dashboard;
