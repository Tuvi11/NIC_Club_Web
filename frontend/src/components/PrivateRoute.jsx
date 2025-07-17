// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  console.log("🔐 [PrivateRoute] Token found:", token);

  return token ? children : <Navigate to="/admin" replace />;
};

export default PrivateRoute;
