import React, { useState } from 'react';
import { Search, Filter, Edit, Trash, UserPlus, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { UserRole } from '../contexts/AuthContext';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  lastActive: string;
  status: 'active' | 'inactive';
  avatar?: string;
}

const UserManagement: React.FC = () => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Sample user data
  const users: User[] = [
    { 
      id: '1', 
      name: 'John Smith', 
      email: 'john.smith@example.com', 
      role: 'admin', 
      department: 'IT',
      lastActive: '2025-05-10',
      status: 'active',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    { 
      id: '2', 
      name: 'Emily Chen', 
      email: 'emily.chen@example.com', 
      role: 'advanced', 
      department: 'Marketing',
      lastActive: '2025-05-09',
      status: 'active',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
    },
    { 
      id: '3', 
      name: 'Alex Turner', 
      email: 'alex.turner@example.com', 
      role: 'user', 
      department: 'Sales',
      lastActive: '2025-05-08',
      status: 'active',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
    },
    { 
      id: '4', 
      name: 'Sarah Johnson', 
      email: 'sarah.johnson@example.com', 
      role: 'advanced', 
      department: 'Finance',
      lastActive: '2025-05-07',
      status: 'active',
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg'
    },
    { 
      id: '5', 
      name: 'Michael Brown', 
      email: 'michael.brown@example.com', 
      role: 'user', 
      department: 'Operations',
      lastActive: '2025-05-05',
      status: 'inactive',
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg'
    },
    { 
      id: '6', 
      name: 'Jennifer Lee', 
      email: 'jennifer.lee@example.com', 
      role: 'user', 
      department: 'Customer Support',
      lastActive: '2025-05-04',
      status: 'active',
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg'
    },
    { 
      id: '7', 
      name: 'David Wilson', 
      email: 'david.wilson@example.com', 
      role: 'advanced', 
      department: 'Product',
      lastActive: '2025-05-03',
      status: 'active',
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg'
    },
    { 
      id: '8', 
      name: 'Lisa Thompson', 
      email: 'lisa.thompson@example.com', 
      role: 'user', 
      department: 'Human Resources',
      lastActive: '2025-05-01',
      status: 'inactive',
      avatar: 'https://randomuser.me/api/portraits/women/8.jpg'
    },
  ];
  
  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Toggle user selection
  const toggleUserSelection = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };
  
  // Toggle all users selection
  const toggleAllUsers = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id));
    }
  };
  
  const getRoleBadgeClass = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'advanced':
        return 'bg-blue-100 text-blue-800';
      case 'user':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">Manage user access and permissions</p>
        </div>
        
        <div className="mt-4 sm:mt-0">
          <button className="btn btn-primary flex items-center">
            <UserPlus size={16} className="mr-2" />
            Add User
          </button>
        </div>
      </div>
      
      {/* Search and filter */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6 border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 input"
            />
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="btn btn-secondary flex items-center"
            >
              <Filter size={16} className="mr-2" />
              Filters
            </button>
            
            <button
              disabled={selectedUsers.length === 0}
              className={`btn flex items-center ${
                selectedUsers.length > 0 
                  ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Trash size={16} className="mr-2" />
              Delete
            </button>
          </div>
        </div>
        
        {/* Filter section */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select className="input">
                <option>All Roles</option>
                <option>Admin</option>
                <option>Advanced User</option>
                <option>Regular User</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select className="input">
                <option>All Departments</option>
                <option>IT</option>
                <option>Marketing</option>
                <option>Sales</option>
                <option>Finance</option>
                <option>Operations</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select className="input">
                <option>All Statuses</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button className="btn btn-primary w-full">Apply Filters</button>
            </div>
          </div>
        )}
      </div>
      
      {/* User table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                      onChange={toggleAllUsers}
                    />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr 
                  key={user.id}
                  className={selectedUsers.includes(user.id) ? 'bg-blue-50' : 'hover:bg-gray-50'}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => toggleUserSelection(user.id)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {user.avatar ? (
                          <img className="h-10 w-10 rounded-full" src={user.avatar} alt={user.name} />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                            {user.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadgeClass(user.role)}`}>
                      {user.role === 'admin' ? 'Admin' : user.role === 'advanced' ? 'Advanced' : 'User'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.lastActive}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash size={16} />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredUsers.length}</span> of{' '}
                <span className="font-medium">{filteredUsers.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <ChevronLeft size={16} />
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  1
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <ChevronRight size={16} />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;