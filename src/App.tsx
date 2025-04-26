import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import AdvancedReports from './pages/AdvancedReports';
import ChatAI from './pages/ChatAI';
import UserManagement from './pages/UserManagement';
import NotFound from './pages/NotFound';

// Protected route component
const ProtectedRoute = ({ 
  children, 
  requiredRole = 'user',
}: { 
  children: React.ReactNode;
  requiredRole?: 'admin' | 'advanced' | 'user';
}) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Check if user has required role
  const hasRequiredRole = () => {
    if (requiredRole === 'user') return true; // All authenticated users have at least user role
    if (requiredRole === 'advanced') return user?.role === 'advanced' || user?.role === 'admin';
    if (requiredRole === 'admin') return user?.role === 'admin';
    return false;
  };
  
  if (!hasRequiredRole()) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <Routes>
      {/* Auth routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>
      
      {/* Dashboard routes */}
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/reports" 
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/advanced-reports" 
          element={
            <ProtectedRoute requiredRole="advanced">
              <AdvancedReports />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/chat-ai" 
          element={
            <ProtectedRoute requiredRole="advanced">
              <ChatAI />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/admin/users" 
          element={
            <ProtectedRoute requiredRole="admin">
              <UserManagement />
            </ProtectedRoute>
          } 
        />
      </Route>
      
      {/* 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;