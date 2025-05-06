import { apiClient } from './apiClient';

interface LoginResponse {
  token: string;
}

interface RegisterResponse {
  id: string;
  username: string;
  email: string;
}

export const authService = {
  async login(username: string, password: string): Promise<LoginResponse> {
    const response = await apiClient.post('/api/auth/login', { username, password });
    return response.data;
  },

  async register(username: string, email: string, password: string): Promise<RegisterResponse> {
    const response = await apiClient.post('/api/auth/register', { username, email, password });
    return response.data;
  }
};