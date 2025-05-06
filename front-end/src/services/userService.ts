import { apiClient } from './apiClient';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

export const userService = {
  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get('/api/user/me');
    return response.data;
  },

  async updateProfile(userData: Partial<User>): Promise<User> {
    const response = await apiClient.put('/api/user/update', userData);
    return response.data;
  },

  async upgradeAccount(): Promise<User> {
    const response = await apiClient.post('/api/advanced/upgrade');
    return response.data;
  },

  async getUsers(): Promise<User[]> {
    const response = await apiClient.get('/api/admin/users');
    return response.data;
  },

  async deleteUser(id: string): Promise<void> {
    await apiClient.delete(`/api/admin/user/${id}`);
  },

  async updateUserRole(id: string, role: string): Promise<User> {
    const response = await apiClient.post(`/api/admin/user/${id}/role?role=${role}`);
    return response.data;
  }
};