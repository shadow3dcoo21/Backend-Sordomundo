//routes/AppRouter.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../services/authService';

// Importar componentes de navegación
import StudentLayout from '../layouts/StudentLayout';
import TeacherLayout from '../layouts/TeacherLayout';
import PublicLayout from '../layouts/PublicLayout';


// Páginas comunes
import Presentacion from '../pages/common/Presentacion';
import Completar from '../pages/common/Completar';
import Textos from '../pages/common/Textos';
import Diccionario from '../pages/common/Diccionario';
import Juego from '../pages/common/Juegos';
import Examen from '../pages/common/Examen';
//import Juegos from '../pages/common/Juegos';

// Profesor
import Dashboard from '../pages/teacher/Dashboard';
// Alumno
import HomeAlumno from '../pages/student/HomeAlumno';
// Externo
import HomeExterno from '../pages/externo/HomeExterno';

import PrivateRoute from './PrivateRoute';
import Login from '../pages/auth/Login';

function AppRouter() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AuthenticatedRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

function AuthenticatedRoutes() {
  const { isAuthenticated, user } = useAuth();

  const getHomePathByRole = () => {
    if (!user) return '/login';
    if (user.role === 'alumno') return '/alumno';
    if (user.role === 'profesor') return '/profesor';
    if (user.role === 'externo') return '/externo';
    return '/login';
  };
  

  return (
    <>
          {/* Layouts */}
    {isAuthenticated && user.role === 'alumno' && <StudentLayout />}
    {isAuthenticated && user.role === 'profesor' && <TeacherLayout />}
    {isAuthenticated && user.role === 'externo' && <PublicLayout />}

    <Routes>
      <Route
        path="/login"
        element={!isAuthenticated ? <Login /> : <Navigate to={getHomePathByRole()} />}
      />
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to={getHomePathByRole()} /> : <Navigate to="/login" />}
      />

        {/* Rutas para el Alumno */}
        <Route path="/alumno" element={<PrivateRoute role="alumno" element={<HomeAlumno />} />} />
        <Route path="/alumno/presentar" element={<PrivateRoute role="alumno" element={<Presentacion />} />} />
        <Route path="/alumno/completar" element={<PrivateRoute role="alumno" element={<Completar />} />} />
        <Route path="/alumno/textos" element={<PrivateRoute role="alumno" element={<Textos />} />} />
        <Route path="/alumno/diccionario" element={<PrivateRoute role="alumno" element={<Diccionario />} />} />
        <Route path="/alumno/examen" element={<PrivateRoute role="alumno" element={<Examen />} />} />
        <Route path="/alumno/juegos" element={<PrivateRoute role="alumno" element={<Juego />} />} />

        {/* Rutas para el Profesor */}
        <Route path="/profesor" element={<PrivateRoute role="profesor" element={<Dashboard />} />} />
        <Route path="/profesor/completar" element={<PrivateRoute role="profesor" element={<Completar />} />} />
        <Route path="/profesor/diccionario" element={<PrivateRoute role="profesor" element={<Diccionario />} />} />
        <Route path="/profesor/examen" element={<PrivateRoute role="profesor" element={<Examen />} />} />

        {/* Rutas para el usuario externo */}
  
        <Route path="/externo" element={<PrivateRoute role="externo" element={<HomeAlumno />} />} />
        <Route path="/externo/presentar" element={<PrivateRoute role="externo" element={<Presentacion />} />} />
        <Route path="/externo/completar" element={<PrivateRoute role="externo" element={<Completar />} />} />
        <Route path="/externo/textos" element={<PrivateRoute role="externo" element={<Textos />} />} />
        <Route path="/externo/diccionario" element={<PrivateRoute role="externo" element={<Diccionario />} />} />
        <Route path="/externo/examen" element={<PrivateRoute role="externo" element={<Examen />} />} />

        
      </Routes>
    </>
  );
}

export default AppRouter;
