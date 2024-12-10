import React, { createContext, useContext, useState, useEffect } from 'react';
import { USER_LOGIN_URL } from './apiJWTServices';
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [lastRoute, setLastRoute] = useState(null);


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('authToken');
    if (storedUser && token) {
      setIsAuthenticated(true);
      setUser(storedUser);
    }
  }, []);

  const login = async ({ username, password, loginType }) => {
    try {
      const endpoint = `${USER_LOGIN_URL}/${loginType}`;
  
      const response = await fetch(endpoint, {
        method: 'POST',
        credentials: 'include', // Añade esta línea
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json(); // Siempre parsea la respuesta
  
      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify({ username, role: loginType }));
        setIsAuthenticated(true);
        setUser({ username, role: loginType });
        return true;
      } else {
        console.error('Error en la autenticación:', data.error);
        return false;
      }
    } catch (error) {
      console.error('Error en login:', error);
      return false;
    }
  };


  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  };
  
  const saveLastRoute = (route) => {
    setLastRoute(route);
    // Opcional: Guardar en localStorage para persistencia
    localStorage.setItem('lastRoute', route);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout ,lastRoute,saveLastRoute }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
