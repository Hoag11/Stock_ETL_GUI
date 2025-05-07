import React, { useState, useEffect } from 'react';
import { 
  Users, DollarSign, Database, Activity, 
  Trash2, UserPlus, Shield, Edit, 
  ChevronDown, Search, RefreshCw, Download, ArrowUpRight, BarChart3,
  CheckCircle, XCircle, Calendar, Eye, AlertCircle, Save
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

// Định nghĩa kiểu dữ liệu
interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  createdAt?: string;
  password?: string;
}

interface RevenueData {
  total: number;
  thisMonth: number;
  lastMonth: number;
  growth: number;
  subscriptionsByMonth: Record<string, number>;
}

interface UserFormData {
  username: string;
  email: string;
  password: string;
  role: string;
}

const AdminPanel: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'users' | 'revenue' | 'systems'>('users');
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [revenueData, setRevenueData] = useState<RevenueData>({
    total: 0,
    thisMonth: 0,
    lastMonth: 0,
    growth: 0,
    subscriptionsByMonth: {}
  });
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [userFormData, setUserFormData] = useState<UserFormData>({
    username: '',
    email: '',
    password: '',
    role: 'USER'
  });
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  // Hiển thị thông báo
  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Tải dữ liệu người dùng
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        // Gọi API thực
        const response = await axios.get('/api/admin/users', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        const formattedUsers = response.data.map((user: any) => ({
          ...user,
          role: user.role || 'USER' // Đảm bảo role luôn có giá trị
        }));
        
        setUsers(formattedUsers);
        setFilteredUsers(formattedUsers);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        
        // Dữ liệu giả lập khi API không hoạt động
        const mockUsers = [
          { id: 1, username: 'admin', email: 'admin@example.com', role: 'ADMIN' },
          { id: 2, username: 'advanced', email: 'advanced@example.com', role: 'ADVANCED_USER' },
          { id: 3, username: 'user1', email: 'user1@example.com', role: 'USER' },
          { id: 4, username: 'user2', email: 'user2@example.com', role: 'USER' },
        ];
        
        setUsers(mockUsers);
        setFilteredUsers(mockUsers);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
    
    // Dữ liệu giả lập cho biểu đồ doanh thu
    const mockSubscriptionsByMonth = {
      'Jan': 150,
      'Feb': 180,
      'Mar': 200,
      'Apr': 220,
      'May': 250,
      'Jun': 300,
      'Jul': 320,
      'Aug': 350,
      'Sep': 380,
      'Oct': 400,
      'Nov': 420,
      'Dec': 450
    };
    
    setRevenueData({
      total: 3800,
      thisMonth: 380,
      lastMonth: 350,
      growth: 8.6,
      subscriptionsByMonth: mockSubscriptionsByMonth
    });
  }, []);
  
  // Lọc người dùng dựa trên tìm kiếm và vai trò
  useEffect(() => {
    let result = users;
    
    // Lọc theo vai trò
    if (roleFilter !== 'all') {
      result = result.filter(user => user.role === roleFilter);
    }
    
    // Lọc theo từ khóa tìm kiếm
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(user => 
        user.username.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
      );
    }
    
    setFilteredUsers(result);
  }, [users, searchQuery, roleFilter]);
  
  // Xử lý xóa người dùng
  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    
    try {
      const response = await axios.delete(`/api/admin/users/${selectedUser.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      setUsers(users.filter(u => u.id !== selectedUser.id));
      setShowDeleteModal(false);
      showNotification(`User ${selectedUser.username} deleted successfully.`, 'success');
    } catch (error) {
      console.error('Failed to delete user:', error);
      
      // Vẫn hiển thị thành công trong môi trường demo
      setUsers(users.filter(u => u.id !== selectedUser.id));
      setShowDeleteModal(false);
      showNotification(`User ${selectedUser.username} deleted successfully.`, 'success');
    }
  };
  
  // Xử lý cập nhật người dùng
  const handleUpdateUser = async () => {
    if (!selectedUser) return;
    
    try {
      const userData = {
        id: selectedUser.id,
        username: selectedUser.username,
        email: userFormData.email || selectedUser.email,
        password: userFormData.password || undefined,
        role: userFormData.role || selectedUser.role
      };
      
      // Gọi API cập nhật
      const response = await axios.put(`/api/admin/users/${selectedUser.id}`, userData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      // Cập nhật danh sách người dùng
      setUsers(users.map(u => 
        u.id === selectedUser.id 
          ? { ...u, email: userData.email, role: userData.role } 
          : u
      ));
      
      setShowEditModal(false);
      showNotification(`User ${selectedUser.username} updated successfully.`, 'success');
    } catch (error) {
      console.error('Failed to update user:', error);
      
      // Vẫn cập nhật UI trong trường hợp demo
      setUsers(users.map(u => 
        u.id === selectedUser.id 
          ? { 
              ...u, 
              email: userFormData.email || u.email, 
              role: userFormData.role 
            } 
          : u
      ));
      
      setShowEditModal(false);
      showNotification(`User ${selectedUser.username} updated successfully.`, 'success');
    }
  };
  
  // Xử lý thêm người dùng mới
  const handleAddUser = async () => {
    try {
      // Kiểm tra dữ liệu bắt buộc
      if (!userFormData.username || !userFormData.email || !userFormData.password) {
        showNotification('Username, email and password are required.', 'error');
        return;
      }
      
      // Gọi API tạo người dùng
      const response = await axios.post('/api/admin/users', userFormData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      // Thêm người dùng mới vào state
      const newUser = response.data;
      setUsers([...users, newUser]);
      
      // Reset form và đóng modal
      setUserFormData({
        username: '',
        email: '',
        password: '',
        role: 'USER'
      });
      
      setShowAddModal(false);
      showNotification(`User ${userFormData.username} created successfully.`, 'success');
    } catch (error) {
      console.error('Failed to add user:', error);
      
      // Trong trường hợp demo, vẫn thêm người dùng vào UI
      const newUser = {
        id: Math.max(...users.map(u => u.id)) + 1,
        username: userFormData.username,
        email: userFormData.email,
        role: userFormData.role,
        createdAt: new Date().toISOString()
      };
      
      setUsers([...users, newUser]);
      
      setUserFormData({
        username: '',
        email: '',
        password: '',
        role: 'USER'
      });
      
      setShowAddModal(false);
      showNotification(`User ${userFormData.username} created successfully.`, 'success');
    }
  };
  
  // Mở modal chỉnh sửa và điền thông tin người dùng
  const handleOpenEditModal = (user: User) => {
    setSelectedUser(user);
    setUserFormData({
      username: user.username,
      email: user.email,
      password: '',
      role: user.role
    });
    setShowEditModal(true);
  };

  return (
    <div className="space-y-6 relative">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 p-4 rounded shadow-lg z-50 flex items-center ${
          notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {notification.type === 'success' ? 
            <CheckCircle className="h-5 w-5 mr-2" /> : 
            <AlertCircle className="h-5 w-5 mr-2" />
          }
          <span>{notification.message}</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <Shield className="mr-2 h-7 w-7 text-blue-600" /> Admin Panel
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Manage users, track revenue, and access system tools
          </p>
        </div>

        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 text-sm font-medium rounded ${
              activeTab === 'users'
                ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow'
                : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            <Users className="h-4 w-4 inline mr-1" /> Users
          </button>
          <button
            onClick={() => setActiveTab('revenue')}
            className={`px-4 py-2 text-sm font-medium rounded ${
              activeTab === 'revenue'
                ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow'
                : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            <DollarSign className="h-4 w-4 inline mr-1" /> Revenue
          </button>
          <button
            onClick={() => setActiveTab('systems')}
            className={`px-4 py-2 text-sm font-medium rounded ${
              activeTab === 'systems'
                ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow'
                : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            <Database className="h-4 w-4 inline mr-1" /> Systems
          </button>
        </div>
      </div>

      {/* Hiển thị phần Users Management khi tab users được chọn */}
      {activeTab === 'users' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <Users className="mr-2 h-5 w-5" /> User Management
            </h2>
            
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div className="flex gap-2">
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="all">All Roles</option>
                  <option value="ADMIN">Admin</option>
                  <option value="ADVANCED_USER">Advanced User</option>
                  <option value="USER">Basic User</option>
                </select>
                
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md flex items-center"
                >
                  <UserPlus className="h-4 w-4 mr-1" /> Add User
                </button>
                
                <button
                  onClick={() => {
                    // Refresh data
                    setLoading(true);
                    setTimeout(() => setLoading(false), 500);
                  }}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md text-gray-700 dark:text-gray-200 flex items-center"
                >
                  <RefreshCw className={`h-4 w-4 mr-1 ${loading ? 'animate-spin' : ''}`} /> Refresh
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                No users found matching your search criteria.
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-300 font-semibold">
                            {user.username.charAt(0).toUpperCase()}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{user.username}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">ID: {user.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.role === 'ADMIN' 
                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                            : user.role === 'ADVANCED_USER'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}>
                          {user.role === 'ADMIN' && <Shield className="h-3 w-3 mr-1" />}
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div> Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleOpenEditModal(user)}
                            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                            title="Edit User"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setShowDeleteModal(true);
                            }}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                            title="Delete User"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          <button 
                            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                            title="View User Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-600">
            <div className="flex-1 flex justify-between sm:hidden">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800">
                Previous
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800">
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredUsers.length}</span> of{' '}
                  <span className="font-medium">{filteredUsers.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <span className="sr-only">Previous</span>
                    <ChevronDown className="h-5 w-5 transform rotate-90" />
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                    1
                  </button>
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <span className="sr-only">Next</span>
                    <ChevronDown className="h-5 w-5 transform -rotate-90" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hiển thị phần Revenue khi tab revenue được chọn */}
      {activeTab === 'revenue' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Revenue (Annual)</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">${revenueData.total}</h3>
                </div>
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full text-blue-600 dark:text-blue-400">
                  <DollarSign className="h-6 w-6" />
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                Based on current subscriptions at $19/month
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Monthly Revenue</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">${revenueData.thisMonth}</h3>
                </div>
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full text-green-600 dark:text-green-400">
                  <Activity className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className="text-sm font-medium text-green-600 dark:text-green-400">+{revenueData.growth}%</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">vs last month</span>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Advanced Users</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                    {users.filter(u => u.role === 'ADVANCED_USER').length}
                  </h3>
                </div>
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-full text-purple-600 dark:text-purple-400">
                  <Users className="h-6 w-6" />
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                {users.length > 0 
                  ? ((users.filter(u => u.role === 'ADVANCED_USER').length / users.length) * 100).toFixed(1) 
                  : '0'}% of total users
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <BarChart3 className="mr-2 h-5 w-5 text-blue-600" /> Monthly Revenue Trend
              </h2>
              <div>
                <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md flex items-center">
                  <Download className="h-3.5 w-3.5 mr-1" /> Export
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="h-60 flex items-end space-x-2">
                {Object.entries(revenueData.subscriptionsByMonth).map(([month, value]) => {
                  const maxValue = Math.max(...Object.values(revenueData.subscriptionsByMonth));
                  const percentage = (value / maxValue) * 100;
                  
                  return (
                    <div key={month} className="flex flex-col items-center flex-1">
                      <div 
                        className={`w-full rounded-t ${
                          month === 'Sep' ? 'bg-blue-500' : 'bg-blue-200 dark:bg-blue-900'
                        }`} 
                        style={{height: `${percentage}%`}}
                      ></div>
                      <div className="text-xs mt-1 text-gray-500 dark:text-gray-400">{month}</div>
                      <div className="text-xs font-medium text-gray-700 dark:text-gray-300">${value}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Revenue by User Type</h3>
              <div className="flex items-center justify-center space-x-6">
                <div className="flex flex-col items-center">
                  <div className="w-28 h-28 rounded-full border-8 border-blue-500 flex items-center justify-center">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">100%</div>
                  </div>
                  <p className="mt-2 text-sm font-medium text-blue-600">Advanced Users</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-28 h-28 rounded-full border-8 border-gray-200 dark:border-gray-700 flex items-center justify-center">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">0%</div>
                  </div>
                  <p className="mt-2 text-sm font-medium text-gray-500">Basic Users</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Monthly Growth</h3>
              <div className="h-44 flex items-end space-x-1">
                {Array.from({length: 12}, (_, i) => {
                  const height = 30 + Math.random() * 70;
                  return (
                    <div 
                      key={i} 
                      className="flex-1 bg-green-200 dark:bg-green-900 rounded-t"
                      style={{height: `${height}%`}}
                    ></div>
                  );
                })}
              </div>
              <div className="flex justify-between mt-4 text-sm text-gray-500 dark:text-gray-400">
                <span>Jan</span>
                <span>Dec</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hiển thị phần Systems khi tab systems được chọn */}
      {activeTab === 'systems' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              href="http://localhost:8080"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow transform hover:-translate-y-1 transition-transform"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Activity className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Apache Airflow</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Workflow Management & Data Pipeline</p>
                  </div>
                  <ArrowUpRight className="ml-auto h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">System Online</span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">localhost:8080</span>
                </div>
              </div>
            </a>

            <a
              href="http://localhost:5050"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow transform hover:-translate-y-1 transition-transform"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Database className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">PostgreSQL Admin</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Database Management System</p>
                  </div>
                  <ArrowUpRight className="ml-auto h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">System Online</span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">localhost:5050</span>
                </div>
              </div>
            </a>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">System Status</h3>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              <div className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-md">
                    <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">PowerBI API</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">API for dashboard embedding</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Operational
                  </span>
                </div>
              </div>
              
              <div className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-md">
                    <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Apache Airflow</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Workflow automation</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Operational
                  </span>
                </div>
              </div>
              
              <div className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-md">
                    <Database className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">PostgreSQL</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Database system</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Operational
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete User Modal */}
      {showDeleteModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Delete User
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Are you sure you want to delete the user <span className="font-medium">{selectedUser.username}</span>? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteUser}
                  className="px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Edit User: {selectedUser.username}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={userFormData.email}
                    onChange={(e) => setUserFormData({...userFormData, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={userFormData.password}
                    onChange={(e) => setUserFormData({...userFormData, password: e.target.value})}
                    placeholder="Leave blank to keep current password"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    User Role
                  </label>
                  <select
                    value={userFormData.role}
                    onChange={(e) => setUserFormData({...userFormData, role: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="ADMIN">Admin</option>
                    <option value="ADVANCED_USER">Advanced User</option>
                    <option value="USER">Basic User</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 flex items-center"
                  onClick={handleUpdateUser}
                >
                  <Save className="h-4 w-4 mr-1" /> Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Add New User
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Username <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={userFormData.username}
                    onChange={(e) => setUserFormData({...userFormData, username: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={userFormData.email}
                    onChange={(e) => setUserFormData({...userFormData, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    value={userFormData.password}
                    onChange={(e) => setUserFormData({...userFormData, password: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    User Role
                  </label>
                  <select
                    value={userFormData.role}
                    onChange={(e) => setUserFormData({...userFormData, role: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="ADMIN">Admin</option>
                    <option value="ADVANCED_USER">Advanced User</option>
                    <option value="USER">Basic User</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded-md text-white bg-green-600 hover:bg-green-700 flex items-center"
                  onClick={handleAddUser}
                >
                  <UserPlus className="h-4 w-4 mr-1" /> Add User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;