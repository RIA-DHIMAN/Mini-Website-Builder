import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import EditorPage from './pages/EditorPage';
import AccountPage from './pages/AccountPage';
import AdminPage from './pages/AdminPage';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen bg-theme-bg transition-colors">
            <ProtectedRoute>
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/editor/:templateId" element={<EditorPage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/landing" element={<LandingPage />} />
              </Routes>
            </ProtectedRoute>
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;