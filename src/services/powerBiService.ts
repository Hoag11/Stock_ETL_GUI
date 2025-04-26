import { models } from 'powerbi-client';

// This service would handle all Power BI related functionality
// In a real application, this would interact with your backend API

// Sample report IDs (would come from your Power BI workspace)
const REPORT_IDS = {
  // Standard reports
  sales: 'sample-report-id-sales',
  customers: 'sample-report-id-customers',
  marketing: 'sample-report-id-marketing',
  finance: 'sample-report-id-finance',
  
  // Advanced reports
  predictiveSales: 'sample-report-id-predictive-sales',
  customerSegments: 'sample-report-id-customer-segments',
  marketBasket: 'sample-report-id-market-basket',
  cohortAnalysis: 'sample-report-id-cohort-analysis',
  attribution: 'sample-report-id-attribution',
  anomaly: 'sample-report-id-anomaly',
};

// Function to get embed token from backend
export const getEmbedToken = async (reportId: string, permissions: string[]): Promise<string> => {
  // In a real app, this would call your backend API to get the embed token
  // For demo purposes, we're just returning a mock token
  return `mock-embed-token-for-${reportId}`;
};

// Get embed config for a report
export const getReportEmbedConfig = async (reportId: string, permissions: string[] = ['view']): Promise<models.IEmbedConfiguration> => {
  // Get embed token from backend
  const embedToken = await getEmbedToken(reportId, permissions);
  
  // Return embed configuration
  return {
    type: 'report',
    id: reportId,
    embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${reportId}`,
    tokenType: models.TokenType.Embed,
    accessToken: embedToken,
    settings: {
      navContentPaneEnabled: false,
      filterPaneEnabled: true,
    },
  };
};

// Get available reports based on user role
export const getAvailableReports = (role: string): string[] => {
  // All users have access to standard reports
  const availableReports = [
    REPORT_IDS.sales,
    REPORT_IDS.customers,
    REPORT_IDS.marketing,
    REPORT_IDS.finance,
  ];
  
  // Advanced users and admins have access to advanced reports
  if (role === 'advanced' || role === 'admin') {
    availableReports.push(
      REPORT_IDS.predictiveSales,
      REPORT_IDS.customerSegments,
      REPORT_IDS.marketBasket,
      REPORT_IDS.cohortAnalysis,
      REPORT_IDS.attribution,
      REPORT_IDS.anomaly
    );
  }
  
  return availableReports;
};

export default {
  getEmbedToken,
  getReportEmbedConfig,
  getAvailableReports,
  REPORT_IDS
};