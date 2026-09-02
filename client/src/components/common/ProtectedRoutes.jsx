import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>;

  return user ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export const RoleRoute = ({ role }) => {
  const { hasRole, loading } = useAuth();

  if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>;

  return hasRole(role) ? <Outlet /> : <Navigate to="/login" replace />;
};
