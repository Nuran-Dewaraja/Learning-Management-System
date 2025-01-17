import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, roleRequired }) => {
  const userRole = localStorage.getItem('role'); 
  const isAuthenticated = !!localStorage.getItem('isAuthenticated'); 

  if (!isAuthenticated || userRole !== roleRequired) {
    return <Navigate to="/login" />;
  }

  return children; 
};

export default ProtectedRoute;
