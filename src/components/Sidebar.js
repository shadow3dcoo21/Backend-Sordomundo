// /components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../services/authService';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav>
      <Link to="/profesor/completar">Completar</Link> {/* Asegúrate de que estos enlaces sean correctos */}
      <Link to="/profesor/diccionario">Diccionario</Link>
      <Link to="/profesor/examen">Examen</Link>
      <Link to="/profesor/completar">Completar</Link> {/* Asegúrate de que estos enlaces sean correctos */}
      <Link to="/profesor/diccionario">Diccionario</Link>
      <Link to="/profesor/examen">Examen</Link>
      <Link to="/profesor/completar">Completar</Link> {/* Asegúrate de que estos enlaces sean correctos */}
      <Link to="/profesor/diccionario">Diccionario</Link>
      <Link to="/profesor/examen">Examen</Link>
      <Link to="/profesor/completar">Completar</Link> {/* Asegúrate de que estos enlaces sean correctos */}
      <Link to="/profesor/diccionario">Diccionario</Link>
      <Link to="/profesor/examen">Examen</Link>

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
