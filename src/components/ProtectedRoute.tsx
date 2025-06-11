import React from 'react';
import { useAuth } from '../context/AuthContext';
import LandingPage from '../pages/LandingPage';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return <LandingPage />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;