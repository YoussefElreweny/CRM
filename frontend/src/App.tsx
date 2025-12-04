
import React, { useState, useCallback, useEffect } from 'react';
import { User } from './types';
import HomePage from './components/public/HomePage.tsx';
import LoginPage from './components/public/LoginPage.tsx';
import DashboardLayout from './components/dashboard/DashboardLayout.tsx';
import * as authService from './services/auth.service';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    const token = authService.getToken();

    if (currentUser && token) {
      setUser(currentUser);
    }

    setIsLoading(false);
  }, []);

  const handleLogin = useCallback((user: User) => {
    setUser(user);
    setShowLogin(false);
  }, []);

  const handleLogout = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);

  const handleGetStarted = useCallback(() => {
    setShowLogin(true);
  }, []);

  // Show loading state while checking for existing session
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return <DashboardLayout user={user} onLogout={handleLogout} />;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {showLogin ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <HomePage onGetStarted={handleGetStarted} />
      )}
    </div>
  );
};

export default App;
