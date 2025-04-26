import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Define user types
export type UserRole = 'admin' | 'advanced' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo (in a real app, this would come from the backend)
const MOCK_USERS = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin' as UserRole,
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    id: '2',
    name: 'Advanced User',
    email: 'advanced@example.com',
    password: 'advanced123',
    role: 'advanced' as UserRole,
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
  },
  {
    id: '3',
    name: 'Regular User',
    email: 'user@example.com',
    password: 'user123',
    role: 'user' as UserRole,
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);
  
  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user with matching credentials
      const foundUser = MOCK_USERS.find(
        u => u.email === email && u.password === password
      );
      
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }
      
      // Create user object (exclude password)
      const { password: _, ...userWithoutPassword } = foundUser;
      
      // Store user in local storage
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      // Update state
      setUser(userWithoutPassword);
      
      // Navigate to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };
  
  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    error
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};