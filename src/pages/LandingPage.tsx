import React, { useState } from 'react';
import { Layout, Palette, Code, Zap, Users, Star, ArrowRight, Check, X, Moon, Sun } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

function LandingPage() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const { user, login, signup, isLoading } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      let success = false;
      if (authMode === 'login') {
        success = await login(formData.email, formData.password);
      } else {
        success = await signup(formData.name, formData.email, formData.password);
      }

      if (!success) {
        setError('Authentication failed. Please try again.');
      } else {
        setShowAuthModal(false);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', password: '' });
    setError('');
  };

  const switchAuthMode = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-theme-bg to-secondary/10">
      {/* Header - Only show if user is not authenticated */}
      {!user && (
        <header className="bg-theme-surface/80 backdrop-blur-md border-b border-theme sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center">
                <Layout className="h-8 w-8 text-primary" />
                <span className="ml-2 text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  PageCraft
                </span>
              </div>
              <div className="flex items-center space-x-4">
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
                <button
                  onClick={() => {
                    setShowAuthModal(true);
                    setAuthMode('login');
                  }}
                  className="text-theme-secondary hover:text-theme-primary px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setShowAuthModal(true);
                    setAuthMode('signup');
                  }}
                  className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Hero Section */}
      <section className={`relative ${user ? 'py-20 lg:py-32' : 'py-20 lg:py-32'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-theme-primary mb-6">
              Create Stunning
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {' '}Landing Pages
              </span>
            </h1>
            <p className="text-xl text-theme-secondary mb-8 max-w-3xl mx-auto">
              Build professional landing pages in minutes with our intuitive drag-and-drop editor. 
              No coding required - just beautiful, responsive designs.
            </p>
            {!user && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    setShowAuthModal(true);
                    setAuthMode('signup');
                  }}
                  className="inline-flex items-center px-8 py-4 bg-primary text-white rounded-lg text-lg font-medium hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl"
                >
                  Start Building Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button className="inline-flex items-center px-8 py-4 border-2 border-theme text-theme-primary rounded-lg text-lg font-medium hover:border-primary hover:text-primary transition-colors">
                  View Templates
                </button>
              </div>
            )}
            {user && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <p className="text-xl text-theme-primary mb-4">
                  Welcome back, <span className="font-semibold text-primary">{user.name}</span>! 
                  Ready to create something amazing?
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-theme-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-theme-primary mb-4">
              Everything You Need to Build Amazing Pages
            </h2>
            <p className="text-xl text-theme-secondary max-w-2xl mx-auto">
              Powerful features that make creating professional landing pages simple and enjoyable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow bg-theme-bg border border-theme">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-theme-primary mb-3">Visual Editor</h3>
              <p className="text-theme-secondary">
                Intuitive drag-and-drop interface with real-time preview. See your changes instantly.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow bg-theme-bg border border-theme">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-theme-primary mb-3">No Code Required</h3>
              <p className="text-theme-secondary">
                Build professional pages without writing a single line of code. Perfect for everyone.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow bg-theme-bg border border-theme">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-theme-primary mb-3">Lightning Fast</h3>
              <p className="text-theme-secondary">
                Optimized templates that load quickly and perform beautifully on all devices.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow bg-theme-bg border border-theme">
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-theme-primary mb-3">Team Collaboration</h3>
              <p className="text-theme-secondary">
                Work together with your team in real-time. Share, edit, and publish together.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow bg-theme-bg border border-theme">
              <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-xl font-semibold text-theme-primary mb-3">Premium Templates</h3>
              <p className="text-theme-secondary">
                Choose from dozens of professionally designed templates for every industry.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow bg-theme-bg border border-theme">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Layout className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-theme-primary mb-3">Responsive Design</h3>
              <p className="text-theme-secondary">
                All templates are mobile-first and look perfect on any device or screen size.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - Only show if user is not authenticated */}
      {!user && (
        <section className="py-20 bg-theme-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-theme-primary mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-xl text-theme-secondary">
                Choose the plan that's right for you. Start free, upgrade when you need more.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-theme-surface rounded-xl shadow-lg p-8 border border-theme">
                <h3 className="text-2xl font-bold text-theme-primary mb-2">Free</h3>
                <p className="text-theme-secondary mb-6">Perfect for getting started</p>
                <div className="text-4xl font-bold text-theme-primary mb-6">$0<span className="text-lg text-theme-secondary">/month</span></div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-theme-secondary">3 Landing Pages</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-theme-secondary">Basic Templates</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-theme-secondary">PageCraft Branding</span>
                  </li>
                </ul>
                <button
                  onClick={() => {
                    setShowAuthModal(true);
                    setAuthMode('signup');
                  }}
                  className="w-full py-3 px-6 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition-colors"
                >
                  Get Started Free
                </button>
              </div>
              
              <div className="bg-primary rounded-xl shadow-xl p-8 text-white relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <p className="text-white/80 mb-6">For growing businesses</p>
                <div className="text-4xl font-bold mb-6">$29<span className="text-lg text-white/80">/month</span></div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-white mr-3" />
                    <span>Unlimited Pages</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-white mr-3" />
                    <span>Premium Templates</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-white mr-3" />
                    <span>Custom Domain</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-white mr-3" />
                    <span>Analytics</span>
                  </li>
                </ul>
                <button className="w-full py-3 px-6 bg-white text-primary rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Start Pro Trial
                </button>
              </div>
              
              <div className="bg-theme-surface rounded-xl shadow-lg p-8 border border-theme">
                <h3 className="text-2xl font-bold text-theme-primary mb-2">Enterprise</h3>
                <p className="text-theme-secondary mb-6">For large organizations</p>
                <div className="text-4xl font-bold text-theme-primary mb-6">$99<span className="text-lg text-theme-secondary">/month</span></div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-theme-secondary">Everything in Pro</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-theme-secondary">Team Collaboration</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-theme-secondary">Priority Support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-theme-secondary">Custom Integrations</span>
                  </li>
                </ul>
                <button className="w-full py-3 px-6 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition-colors">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section - Only show if user is not authenticated */}
      {!user && (
        <section className="py-20 bg-primary">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Build Your Perfect Landing Page?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Join thousands of creators who trust PageCraft to bring their ideas to life.
            </p>
            <button
              onClick={() => {
                setShowAuthModal(true);
                setAuthMode('signup');
              }}
              className="inline-flex items-center px-8 py-4 bg-white text-primary rounded-lg text-lg font-medium hover:bg-gray-50 transition-colors shadow-lg"
            >
              Start Building Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-theme-surface border-t border-theme py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Layout className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-theme-primary">PageCraft</span>
            </div>
            <div className="text-theme-secondary">
              © 2024 PageCraft. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Auth Modal - Only show if user is not authenticated */}
      {!user && showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-theme-surface rounded-xl shadow-2xl w-full max-w-md border border-theme">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-theme-primary">
                  {authMode === 'login' ? 'Sign In' : 'Create Account'}
                </h2>
                <button
                  onClick={() => setShowAuthModal(false)}
                  className="text-theme-secondary hover:text-theme-primary"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {authMode === 'signup' && (
                  <div>
                    <label className="block text-sm font-medium text-theme-primary mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-theme rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-theme-bg text-theme-primary"
                      placeholder="Enter your full name"
                    />
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-theme-primary mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-theme rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-theme-bg text-theme-primary"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-theme-primary mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-3 py-2 border border-theme rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-theme-bg text-theme-primary"
                    placeholder="Enter your password"
                  />
                </div>

                {error && (
                  <div className="text-red-500 text-sm">{error}</div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2 px-4 bg-primary text-white rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                >
                  {isLoading ? 'Please wait...' : (authMode === 'login' ? 'Sign In' : 'Create Account')}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-theme-secondary">
                  {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
                  <button
                    onClick={() => switchAuthMode(authMode === 'login' ? 'signup' : 'login')}
                    className="text-primary hover:opacity-80 font-medium"
                  >
                    {authMode === 'login' ? 'Sign up' : 'Sign in'}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;