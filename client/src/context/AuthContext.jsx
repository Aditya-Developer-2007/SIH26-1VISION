import React, { createContext, useState, useEffect, useContext } from 'react';
import { authApi } from '../services/authApi';

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (credentials) => {
    const response = await authApi.login(credentials);
    if (response.success) {
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    }
    throw new Error(response.message || 'Login failed');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const hasRole = (role) => {
    return user && user.role === role;
  };

  const switchRole = (role) => {
    // For demo purposes, just logout to force a new login
    alert('Role switching requires re-login in the real app');
    logout();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, hasRole, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};
