import React, { useState } from 'react';
import { Filter, Download } from 'lucide-react';

const Reports: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  const reports = [
    { id: 'sales', name: 'Sales Performance', description: 'Overview of sales metrics by region, product, and time period' },
    { id: 'customers', name: 'Customer Analysis', description: 'Customer demographics, behavior patterns, and satisfaction metrics' },
    { id: 'marketing', name: 'Marketing Campaigns', description: 'Campaign performance, ROI, and audience engagement metrics' },
    { id: 'finance', name: 'Financial Overview', description: 'P&L statement, cash flow, and key financial indicators' },
  ];
  
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Standard Reports</h1>
          <p className="text-gray-600">View and analyze your business data</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex space-x-2">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="btn btn-secondary flex items-center"
          >
            <Filter size={16} className="mr-1" />
            Filters
          </button>
          
          <button 
            disabled={!selectedReport}
            className={`btn flex items-center ${
              selectedReport ? 'btn-primary' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Download size={16} className="mr-1" />
            Export
          </button>
        </div>
      </div>
      
      {/* Filter panel */}
      {showFilters && (
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6 border border-gray-200 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <select className="input">
              <option>Last 30 days</option>
              <option>Last quarter</option>
              <option>Year to date</option>
              <option>Custom range</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
            <select className="input">
              <option>All Regions</option>
              <option>North America</option>
              <option>Europe</option>
              <option>Asia Pacific</option>
              <option>Latin America</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Category</label>
            <select className="input">
              <option>All Categories</option>
              <option>Electronics</option>
              <option>Furniture</option>
              <option>Clothing</option>
              <option>Office Supplies</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button className="btn btn-primary w-full">Apply Filters</button>
          </div>
        </div>
      )}
      
      {/* Report selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {reports.map((report) => (
          <div 
            key={report.id}
            onClick={() => setSelectedReport(report.id)}
            className={`
              border p-4 rounded-lg cursor-pointer transition-colors duration-200
              ${selectedReport === report.id 
                ? 'bg-blue-50 border-blue-200' 
                : 'bg-white border-gray-200 hover:bg-gray-50'
              }
            `}
          >
            <h3 className="font-medium text-gray-900">{report.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{report.description}</p>
          </div>
        ))}
      </div>
      
      {/* Report display area */}
      {selectedReport ? (
        <div className="report-container">
          <div className="w-full h-full flex items-center justify-center bg-gray-50">
            <div className="text-center p-4">
              <h3 className="text-xl font-semibold mb-2">
                {reports.find(r => r.id === selectedReport)?.name}
              </h3>
              <p className="text-gray-500 mb-4">
                [Power BI Report Would Be Embedded Here]
              </p>
              <p className="text-sm text-gray-600 max-w-md mx-auto">
                In a production environment, this would display the actual Power BI report 
                embedded using the Power BI JavaScript SDK.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Select a report to view</h3>
          <p className="text-gray-600">
            Choose from the reports above to display the visualizations and data
          </p>
        </div>
      )}
    </div>
  );
};

export default Reports;