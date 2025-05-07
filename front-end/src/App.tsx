import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layouts
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import Profile from './pages/profile/Profile';
import AdminPanel from './pages/admin/AdminPanel';
import AIChat from './pages/ai/AIChat';
import Upgrade from './pages/profile/Upgrade';
import NotFound from './pages/NotFound';

function App() {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />
      </Route>

      {/* Protected routes */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/ai-chat" element={isAuthenticated ? <AIChat /> : <Navigate to="/login" />} />
        <Route path="/upgrade" element={isAuthenticated ? <Upgrade /> : <Navigate to="/login" />} />
        
        {/* Admin routes */}
        <Route 
          path="/admin" 
          element={
            isAuthenticated && user?.role === 'ADMIN' 
              ? <AdminPanel /> 
              : <Navigate to="/login" />
          } 
        />
      </Route>

      {/* Redirect from root to dashboard or login */}
      <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
      
      {/* Not found route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;