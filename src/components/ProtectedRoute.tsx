import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: ('tenant' | 'landlord' | 'admin')[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { currentUser, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated || !currentUser) {
    // Redirect unauthenticated visitor to login, preserving destination in redirect param
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`} replace />;
  }

  // Check if current user has the allowed role
  if (!allowedRoles.includes(currentUser.role)) {
    // If user is logged in but doesn't have the required role,
    // redirect them to their corresponding dashboard
    if (currentUser.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (currentUser.role === 'landlord') {
      return <Navigate to="/landlord/dashboard" replace />;
    } else {
      return <Navigate to="/tenant/dashboard" replace />;
    }
  }

  return <>{children}</>;
};
