// src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAuthStore from '../store/authSlice';

const ProtectedRoute = ({ allowedRole }) => {
  const { user, token, checkAuth, loading } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      if (!token && !user) {
        await checkAuth(); // Restore state from localStorage
      }
      setIsChecking(false);
    };
    verifyAuth();
  }, [token, user, checkAuth]);

  if (isChecking || loading) {
    return <div>Loading...</div>; // Show loading indicator while checking auth
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (user?.user_role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

ProtectedRoute.propTypes = {
  allowedRole: PropTypes.string.isRequired,
};

export default ProtectedRoute;