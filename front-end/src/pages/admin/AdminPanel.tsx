import React, { useState, useEffect } from 'react';
import { 
  Search, Trash2, Shield, MoreHorizontal, 
  AlertCircle, Loader2, Check, X
} from 'lucide-react';
import { userService } from '../../services/userService';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

const AdminPanel: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionSuccess, setActionSuccess] = useState('');
  
  useEffect(() => {
    fetchUsers();
  }, []);
  
  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    
    try {
      const userData = await userService.getUsers();
      setUsers(userData);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch users. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    
    setActionLoading(true);
    
    try {
      await userService.deleteUser(selectedUser.id);
      setUsers(users.filter(user => user.id !== selectedUser.id));
      setShowDeleteModal(false);
      setSelectedUser(null);
      setActionSuccess(`User ${selectedUser.username} has been deleted.`);
      
      setTimeout(() => {
        setActionSuccess('');
      }, 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete user. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };
  
  const handleUpdateRole = async () => {
    if (!selectedUser) return;
    
    setActionLoading(true);
    
    try {
      const newRole = selectedUser.role === 'ADMIN' ? 'BASIC' : 'ADMIN';
      const updatedUser = await userService.updateUserRole(selectedUser.id, newRole);
      
      setUsers(users.map(user => 
        user.id === selectedUser.id ? { ...user, role: updatedUser.role } : user
      ));
      
      setShowRoleModal(false);
      setSelectedUser(null);
      setActionSuccess(`User ${selectedUser.username}'s role has been updated to ${newRole}.`);
      
      setTimeout(() => {
        setActionSuccess('');
      }, 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update user role. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };
  
  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Manage users and system settings
        </p>
      </div>
      
      {actionSuccess && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md flex items-center">
          <Check className="h-5 w-5 mr-2" />
          {actionSuccess}
        </div>
      )}
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          {error}
          <button 
            className="ml-auto text-red-700 hover:text-red-800" 
            onClick={() => setError('')}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            User Management
          </h2>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="py-2 pl-10 pr-4 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white w-56"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              No users found matching your search criteria.
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                          {user.username[0].toUpperCase()}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.username}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            ID: {user.id.substring(0, 8)}...
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.role === 'ADMIN' 
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' 
                          : user.role === 'ADVANCED'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                        {user.role === 'ADMIN' && <Shield className="h-3 w-3 mr-1" />}
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <div className="flex items-center justify-end space-x-3">
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setShowRoleModal(true);
                          }}
                          className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-200"
                        >
                          <Shield className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setShowDeleteModal(true);
                          }}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      
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
                  disabled={actionLoading}
                  className={`px-4 py-2 rounded-md text-white ${
                    actionLoading 
                      ? 'bg-red-400 cursor-not-allowed' 
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  {actionLoading ? (
                    <span className="flex items-center">
                      <Loader2 className="animate-spin h-4 w-4 mr-2" />
                      Deleting...
                    </span>
                  ) : (
                    'Delete'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Update Role Modal */}
      {showRoleModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Update User Role
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Do you want to {selectedUser.role === 'ADMIN' ? 'remove admin rights from' : 'make admin'} <span className="font-medium">{selectedUser.username}</span>?
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowRoleModal(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateRole}
                  disabled={actionLoading}
                  className={`px-4 py-2 rounded-md text-white ${
                    actionLoading 
                      ? 'bg-blue-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {actionLoading ? (
                    <span className="flex items-center">
                      <Loader2 className="animate-spin h-4 w-4 mr-2" />
                      Updating...
                    </span>
                  ) : (
                    'Confirm'
                  )}
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