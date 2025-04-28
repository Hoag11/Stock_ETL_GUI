import React, { useEffect, useRef } from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models, service } from 'powerbi-client';
import powerBiService from '../services/powerBiService';
import { useAuth } from '../contexts/AuthContext';

interface PowerBIReportProps {
  reportId: string;
  height?: string;
  width?: string;
}

const PowerBIReport: React.FC<PowerBIReportProps> = ({ 
  reportId, 
  height = '100%', 
  width = '100%' 
}) => {
  const { user } = useAuth();
  const reportRef = useRef<PowerBIEmbed>(null);
  const [embedConfig, setEmbedConfig] = React.useState<models.IEmbedConfiguration | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  
  useEffect(() => {
    const loadReport = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Get permissions based on user role
        const permissions = user?.role === 'admin' 
          ? ['view', 'edit', 'create', 'delete'] 
          : user?.role === 'advanced' 
            ? ['view', 'edit'] 
            : ['view'];
        
        // Get embed configuration
        const config = await powerBiService.getReportEmbedConfig(reportId, permissions);
        setEmbedConfig(config);
      } catch (err) {
        console.error('Error loading Power BI report:', err);
        setError('Failed to load report. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (reportId) {
      loadReport();
    }
  }, [reportId, user?.role]);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full w-full bg-white">
        <div className="text-center p-4">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading report...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex items-center justify-center h-full w-full bg-white">
        <div className="text-center p-4 max-w-md">
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
            {error}
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="btn btn-primary"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
  
  // In a real application, this would render the actual Power BI report
  // For demo purposes, we'll show a placeholder
  return (
    <div className="w-full h-full bg-white">
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center p-4">
          <h3 className="text-xl font-semibold mb-2">
            Power BI Report Placeholder
          </h3>
          <p className="text-gray-500 mb-4">
            Report ID: {reportId}
          </p>
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            In a production environment, this would display an actual Power BI report
            embedded using the Power BI JavaScript SDK.
          </p>
        </div>
      </div>
    </div>
  );
  
  /* 
  // This is the actual PowerBI embed component that would be used in production
  return (
    <div style={{ height, width }}>
      {embedConfig && (
        <PowerBIEmbed
          ref={reportRef}
          embedConfig={embedConfig}
          cssClassName="report-container"
          getEmbeddedComponent={(embeddedReport) => {
            // You can interact with the report using the embedded component API
            console.log('Report loaded:', embeddedReport);
          }}
        />
      )}
    </div>
  );
  */
};

export default PowerBIReport;