import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';

export const PrivateRoute = ({ children }) => {
  const { loggedIn, checkingAuthStatus } = useAuthStatus();

  if (checkingAuthStatus) {
    return <div>Loading...</div>;
  }

  return loggedIn ? children : <Navigate to="/login" replace />;
};
