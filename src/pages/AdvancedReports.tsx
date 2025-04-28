import React, { useState } from 'react';
import { Filter, Download, Settings, Share2 } from 'lucide-react';

const AdvancedReports: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  const reports = [
    { 
      id: 'predictive-sales', 
      name: 'Predictive Sales Analysis', 
      description: 'AI-powered sales forecasting with trend analysis',
      complexity: 'high'
    },
    { 
      id: 'customer-segments', 
      name: 'Customer Segmentation', 
      description: 'Advanced clustering of customer groups based on behavior',
      complexity: 'medium'
    },
    { 
      id: 'market-basket', 
      name: 'Market Basket Analysis', 
      description: 'Product affinity and purchase pattern analysis',
      complexity: 'high'
    },
    { 
      id: 'cohort-analysis', 
      name: 'Customer Cohort Analysis', 
      description: 'Retention and behavior patterns across customer cohorts',
      complexity: 'medium'
    },
    { 
      id: 'attribution', 
      name: 'Multi-channel Attribution', 
      description: 'Marketing channel effectiveness and attribution modeling',
      complexity: 'high'
    },
    { 
      id: 'anomaly', 
      name: 'Anomaly Detection', 
      description: 'Identifying outliers and unusual patterns in business data',
      complexity: 'medium'
    },
  ];
  
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Advanced Reports</h1>
          <p className="text-gray-600">Advanced analytics and AI-powered insights</p>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Complexity</label>
            <select className="input">
              <option>All Levels</option>
              <option>Basic</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Analysis Type</label>
            <select className="input">
              <option>All Types</option>
              <option>Predictive</option>
              <option>Prescriptive</option>
              <option>Diagnostic</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button className="btn btn-primary w-full">Apply Filters</button>
          </div>
        </div>
      )}
      
      {/* Report cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {reports.map((report) => (
          <div 
            key={report.id}
            onClick={() => setSelectedReport(report.id)}
            className={`
              border p-4 rounded-lg cursor-pointer transition-all duration-200
              ${selectedReport === report.id 
                ? 'bg-blue-50 border-blue-200 shadow-md' 
                : 'bg-white border-gray-200 hover:bg-gray-50 hover:shadow-sm'
              }
            `}
          >
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-gray-900">{report.name}</h3>
              <span 
                className={`
                  text-xs px-2 py-0.5 rounded-full
                  ${report.complexity === 'high' 
                    ? 'bg-purple-100 text-purple-800' 
                    : 'bg-blue-100 text-blue-800'
                  }
                `}
              >
                {report.complexity === 'high' ? 'Advanced' : 'Intermediate'}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-2">{report.description}</p>
            <div className="flex mt-4 space-x-2">
              <button className="p-1 rounded-md text-gray-500 hover:bg-gray-100">
                <Settings size={16} />
              </button>
              <button className="p-1 rounded-md text-gray-500 hover:bg-gray-100">
                <Share2 size={16} />
              </button>
            </div>
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
                [Advanced Power BI Report Would Be Embedded Here]
              </p>
              <p className="text-sm text-gray-600 max-w-md mx-auto">
                In a production environment, this would display the actual Power BI report with advanced 
                analytics features embedded using the Power BI JavaScript SDK.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Select an advanced report to view</h3>
          <p className="text-gray-600">
            These reports provide deeper insights using advanced analytics and AI
          </p>
        </div>
      )}
    </div>
  );
};

export default AdvancedReports;