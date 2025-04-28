import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };
  
  return (
    <div className="w-full animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Log in to your account</h1>
        <p className="mt-2 text-gray-600">
          Enter your credentials to access your dashboard
        </p>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary w-full flex justify-center"
        >
          {isLoading ? 'Logging in...' : 'Log in'}
        </button>
      </form>
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Demo accounts:</p>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
          <div className="bg-gray-100 p-2 rounded">
            <p className="font-semibold">Admin</p>
            <p>admin@example.com</p>
            <p>admin123</p>
          </div>
          <div className="bg-gray-100 p-2 rounded">
            <p className="font-semibold">Advanced</p>
            <p>advanced@example.com</p>
            <p>advanced123</p>
          </div>
          <div className="bg-gray-100 p-2 rounded">
            <p className="font-semibold">Regular User</p>
            <p>user@example.com</p>
            <p>user123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;