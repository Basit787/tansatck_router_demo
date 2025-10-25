import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from '@tanstack/react-router';
import {type ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: string[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { role, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (role && !allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};