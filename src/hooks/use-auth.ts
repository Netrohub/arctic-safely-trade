import { useState, useEffect } from 'react';

// Mock authentication hook - replace with real auth later
export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check localStorage for mock auth state
    const authState = localStorage.getItem('mockAuth');
    setIsAuthenticated(authState === 'true');
  }, []);

  const login = () => {
    localStorage.setItem('mockAuth', 'true');
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('mockAuth');
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
};
