import React, { useState } from 'react';
import { Users, Shield, Trash2, Edit, Search, Filter } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function AdminPage() {
  const { user, getAllUsers, updateUserRole, deleteUser, isLoading } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [subscriptionFilter, setSubscriptionFilter] = useState('all');
  const [editingUser, setEditingUser] = useState<string | null>(null);

  if (!user || user.role !== 'admin') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <Shield className="h-16 w-16 text-theme-secondary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-theme-primary mb-2">Access Denied</h2>
          <p className="text-theme-secondary">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  const allUsers = getAllUsers();
  const filteredUsers = allUsers.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    const matchesSubscription = subscriptionFilter === 'all' || u.subscription === subscriptionFilter;
    return matchesSearch && matchesRole && matchesSubscription;
  });

  const handleRoleChange = async (userId: string, newRole: 'user' | 'admin') => {
    await updateUserRole(userId, newRole);
    setEditingUser(null);
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      await deleteUser(userId);
    }
  };

  const stats = {
    totalUsers: allUsers.length,
    adminUsers: allUsers.filter(u => u.role === 'admin').length,
    freeUsers: allUsers.filter(u => u.subscription === 'free').length,
    paidUsers: allUsers.filter(u => u.subscription !== 'free').length,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-theme-primary mb-2">Admin Dashboard</h1>
        <p className="text-theme-secondary">Manage users and system settings</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-theme-surface rounded-lg shadow p-6 border border-theme">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-primary" />
            <div className="ml-4">
              <p className="text-sm font-medium text-theme-secondary">Total Users</p>
              <p className="text-2xl font-bold text-theme-primary">{stats.totalUsers}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-theme-surface rounded-lg shadow p-6 border border-theme">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            <div className="ml-4">
              <p className="text-sm font-medium text-theme-secondary">Admins</p>
              <p className="text-2xl font-bold text-theme-primary">{stats.adminUsers}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-theme-surface rounded-lg shadow p-6 border border-theme">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-green-600 dark:text-green-400" />
            <div className="ml-4">
              <p className="text-sm font-medium text-theme-secondary">Free Users</p>
              <p className="text-2xl font-bold text-theme-primary">{stats.freeUsers}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-theme-surface rounded-lg shadow p-6 border border-theme">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
            <div className="ml-4">
              <p className="text-sm font-medium text-theme-secondary">Paid Users</p>
              <p className="text-2xl font-bold text-theme-primary">{stats.paidUsers}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-theme-surface rounded-lg shadow mb-6 border border-theme">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-theme-secondary h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-theme rounded-md focus:ring-primary focus:border-primary bg-theme-bg text-theme-primary"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-3 py-2 border border-theme rounded-md focus:ring-primary focus:border-primary bg-theme-bg text-theme-primary"
              >
                <option value="all">All Roles</option>
                <option value="user">Users</option>
                <option value="admin">Admins</option>
              </select>
              
              <select
                value={subscriptionFilter}
                onChange={(e) => setSubscriptionFilter(e.target.value)}
                className="px-3 py-2 border border-theme rounded-md focus:ring-primary focus:border-primary bg-theme-bg text-theme-primary"
              >
                <option value="all">All Plans</option>
                <option value="free">Free</option>
                <option value="pro">Pro</option>
                <option value="enterprise">Enterprise</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-theme-surface rounded-lg shadow overflow-hidden border border-theme">
        <div className="px-6 py-4 border-b border-theme">
          <h2 className="text-lg font-medium text-theme-primary">Users ({filteredUsers.length})</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-theme">
            <thead className="bg-theme-bg">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-theme-secondary uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-theme-secondary uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-theme-secondary uppercase tracking-wider">
                  Subscription
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-theme-secondary uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-theme-secondary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-theme-surface divide-y divide-theme">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-theme-bg transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {u.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-theme-primary">{u.name}</div>
                        <div className="text-sm text-theme-secondary">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingUser === u.id ? (
                      <select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u.id, e.target.value as 'user' | 'admin')}
                        className="text-sm border border-theme rounded px-2 py-1 bg-theme-bg text-theme-primary"
                        disabled={isLoading}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    ) : (
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        u.role === 'admin' 
                          ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200' 
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                      }`}>
                        {u.role}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${
                      u.subscription === 'free' 
                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                        : u.subscription === 'pro'
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200'
                        : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200'
                    }`}>
                      {u.subscription}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-theme-secondary">
                    {u.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {editingUser === u.id ? (
                        <button
                          onClick={() => setEditingUser(null)}
                          className="text-theme-secondary hover:text-theme-primary transition-colors"
                        >
                          Cancel
                        </button>
                      ) : (
                        <button
                          onClick={() => setEditingUser(u.id)}
                          className="text-primary hover:opacity-80 transition-opacity"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                      )}
                      
                      {u.id !== user.id && (
                        <button
                          onClick={() => handleDeleteUser(u.id)}
                          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                          disabled={isLoading}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;