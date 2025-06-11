import React, { useState } from 'react';
import { User, Mail, Calendar, CreditCard, Trash2, Save, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function AccountPage() {
  const { user, updateProfile, deleteAccount, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await updateProfile(formData);
    if (success) {
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleDeleteAccount = async () => {
    const success = await deleteAccount();
    if (success) {
      // User will be redirected to landing page automatically
    }
  };

  const subscriptionPlans = {
    free: { name: 'Free', price: '$0', features: ['3 Landing Pages', 'Basic Templates', 'MINI-WEB-BUILDER Branding'] },
    pro: { name: 'Pro', price: '$29', features: ['Unlimited Pages', 'Premium Templates', 'Custom Domain', 'Analytics'] },
    enterprise: { name: 'Enterprise', price: '$99', features: ['Everything in Pro', 'Team Collaboration', 'Priority Support', 'Custom Integrations'] }
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-theme-surface shadow rounded-lg border border-theme">
        <div className="border-b border-theme">
          <nav className="-mb-px flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'profile'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-theme-secondary hover:text-theme-primary hover:border-gray-300'
              }`}
            >
              <User className="h-4 w-4 inline mr-2" />
              Profile
            </button>
            <button
              onClick={() => setActiveTab('subscription')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'subscription'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-theme-secondary hover:text-theme-primary hover:border-gray-300'
              }`}
            >
              <CreditCard className="h-4 w-4 inline mr-2" />
              Subscription
            </button>
            <button
              onClick={() => setActiveTab('danger')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'danger'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-theme-secondary hover:text-theme-primary hover:border-gray-300'
              }`}
            >
              <AlertTriangle className="h-4 w-4 inline mr-2" />
              Danger Zone
            </button>
          </nav>
        </div>

        <div className="p-6">
          {message && (
            <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
              <p className="text-green-800 dark:text-green-200">{message}</p>
            </div>
          )}

          {activeTab === 'profile' && (
            <div>
              <h2 className="text-2xl font-bold text-theme-primary mb-6">Profile Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <h3 className="text-lg font-medium text-theme-primary">{user.name}</h3>
                    <p className="text-sm text-theme-secondary">{user.email}</p>
                    <div className="mt-2 flex items-center text-sm text-theme-secondary">
                      <Calendar className="h-4 w-4 mr-1" />
                      Joined {user.createdAt}
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-theme-primary mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 border border-theme rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-theme-bg text-theme-primary"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-theme-primary mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 border border-theme rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-theme-bg text-theme-primary"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:opacity-90 disabled:opacity-50 transition-opacity"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'subscription' && (
            <div>
              <h2 className="text-2xl font-bold text-theme-primary mb-6">Subscription</h2>
              
              <div className="bg-theme-bg rounded-lg p-6 mb-6 border border-theme">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-theme-primary">Current Plan</h3>
                    <p className="text-sm text-theme-secondary">
                      You are currently on the <span className="font-medium capitalize">{user.subscription}</span> plan
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-theme-primary">
                      {subscriptionPlans[user.subscription].price}
                      <span className="text-sm font-normal text-theme-secondary">/month</span>
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(subscriptionPlans).map(([key, plan]) => (
                  <div
                    key={key}
                    className={`border rounded-lg p-6 ${
                      user.subscription === key
                        ? 'border-primary bg-primary/5'
                        : 'border-theme bg-theme-surface'
                    }`}
                  >
                    <h3 className="text-lg font-medium text-theme-primary mb-2">{plan.name}</h3>
                    <p className="text-2xl font-bold text-theme-primary mb-4">
                      {plan.price}
                      <span className="text-sm font-normal text-theme-secondary">/month</span>
                    </p>
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="text-sm text-theme-secondary">
                          • {feature}
                        </li>
                      ))}
                    </ul>
                    {user.subscription === key ? (
                      <div className="text-center py-2 text-primary font-medium">
                        Current Plan
                      </div>
                    ) : (
                      <button className="w-full py-2 px-4 bg-primary text-white rounded-md hover:opacity-90 transition-opacity">
                        {key === 'free' ? 'Downgrade' : 'Upgrade'}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'danger' && (
            <div>
              <h2 className="text-2xl font-bold text-red-600 mb-6">Danger Zone</h2>
              
              <div className="border border-red-200 dark:border-red-800 rounded-lg p-6 bg-red-50 dark:bg-red-900/20">
                <h3 className="text-lg font-medium text-red-900 dark:text-red-200 mb-2">Delete Account</h3>
                <p className="text-sm text-red-700 dark:text-red-300 mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                  All your templates and data will be permanently deleted.
                </p>
                
                {!showDeleteConfirm ? (
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </button>
                ) : (
                  <div className="space-y-4">
                    <p className="text-sm font-medium text-red-900 dark:text-red-200">
                      Are you absolutely sure? This action cannot be undone.
                    </p>
                    <div className="flex space-x-3">
                      <button
                        onClick={handleDeleteAccount}
                        disabled={isLoading}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 transition-colors"
                      >
                        {isLoading ? 'Deleting...' : 'Yes, Delete My Account'}
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(false)}
                        className="px-4 py-2 border border-theme text-theme-secondary rounded-md hover:bg-theme-bg transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountPage;