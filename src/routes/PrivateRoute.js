import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../services/authService';

function PrivateRoute({ element, role }) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  // Guardar la ruta actual en localStorage
  if (isAuthenticated) {
    localStorage.setItem('lastPath', location.pathname);
  }

  // Verificar autenticación y rol
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return element;
}

export default PrivateRoute;
