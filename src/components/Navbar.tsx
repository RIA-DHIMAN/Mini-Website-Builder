import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, LogOut, User, Settings, Shield, Home, Moon, Sun } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();

  const isLandingPage = location.pathname === '/landing';

  return (
    <nav className="bg-theme-surface border-b border-theme shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center">
            <Layout className="h-8 w-8 text-primary" />
            <span className="ml-2 text-xl font-semibold text-theme-primary">PageCraft</span>
          </Link>
          
          {user && (
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className={`text-theme-secondary hover:text-theme-primary px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === '/' ? 'bg-gray-100 dark:bg-dark-surface' : ''
                }`}
              >
                Templates
              </Link>
              
              <Link
                to="/landing"
                className={`text-theme-secondary hover:text-theme-primary px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isLandingPage ? 'bg-gray-100 dark:bg-dark-surface' : ''
                }`}
              >
                <Home className="h-4 w-4 inline mr-1" />
                Home
              </Link>
              
              {user.role === 'admin' && (
                <Link
                  to="/admin"
                  className={`text-theme-secondary hover:text-theme-primary px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === '/admin' ? 'bg-gray-100 dark:bg-dark-surface' : ''
                  }`}
                >
                  <Shield className="h-4 w-4 inline mr-1" />
                  Admin
                </Link>
              )}

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-md text-theme-secondary hover:text-theme-primary hover:bg-gray-100 dark:hover:bg-dark-surface transition-colors"
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </button>
              
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center text-sm text-theme-secondary hover:text-theme-primary px-3 py-2 rounded-md transition-colors"
                >
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium mr-2">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  {user.name}
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-theme-surface rounded-md shadow-lg py-1 z-50 border border-theme">
                    <div className="px-4 py-2 text-sm text-theme-secondary border-b border-theme">
                      {user.email}
                      <div className="text-xs text-primary capitalize">{user.subscription} Plan</div>
                    </div>
                    <Link
                      to="/account"
                      className="flex items-center px-4 py-2 text-sm text-theme-secondary hover:bg-gray-100 dark:hover:bg-dark-surface transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Account Settings
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-theme-secondary hover:bg-gray-100 dark:hover:bg-dark-surface transition-colors"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;