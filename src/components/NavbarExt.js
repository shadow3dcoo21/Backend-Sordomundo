// /components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../services/authService';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav>
      <Link to="/externo/completar">Completar</Link> {/* Asegúrate de que estos enlaces sean correctos */}
      <Link to="/externo/diccionario">Diccionario</Link>
      <Link to="/externo/examen">Examen</Link>

      {/* Otros enlaces de alumno */}
      {user && (
        <>
          <button onClick={logout}>Cerrar sesión</button>
          <span>Bienvenido, {user.username}</span>
        </>
      )}
    </nav>
  );
}

export default Navbar;
