import React, { useState, useEffect, useRef,useContext } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../services/authService';
import './styles/Navbar.css';
import { NavLink } from 'react-router-dom';
function StudentLayout() {
    const { user, logout } = useAuth();

    const [isExpanded, setIsExpanded] = useState(false);
 
    const [divWidth, setDivWidth] = useState(0); // Cambiar a width
  
    const handleClick = () => {
      setIsExpanded(!isExpanded);
      
  
      if (!isExpanded) {
        // Expandir el div
        setDivWidth(600); // Cambia 200 por el tamaño que desees
      } else {
        // Guardar tamaño actual y volver al tamaño inicial
        setDivWidth(0);
      }
    };

  return (
    < >
    <nav>

          <ul className="navbar">
        
        <li className="dropdown dropdown2" activeClassName="active">
          <span>Palabras</span>
          <ul className="dropdown-menu">
            <li className="dropdownn">
              <NavLink className='subtitulo' to="/alumno/presentar" activeClassName="active">Presentar</NavLink>
            </li>
            <li className="dropdownn">
              <NavLink className='subtitulo' to="/alumno/completar" activeClassName="active dropdown2">Completar</NavLink>
            </li>
          </ul>
        </li>
        
        <li className="dropdown dropdown3">
          <NavLink to="/alumno/textos" activeClassName="active">Textos</NavLink>
        </li>
        <li className="dropdown dropdown3">
          <NavLink to="/alumno/diccionario" activeClassName="active">Diccionario</NavLink>
        </li>
        <li className="dropdown dropdown3">
          <NavLink to="/alumno/examen" activeClassName="active">Examen</NavLink>
        </li>

      </ul>

     

    </nav>

    <div  className='modal__' style={{ display: 'flex', alignItems: 'flex-start' ,position:'absolute',right: 0 ,zIndex:99999,overflow:'hidden',}}>
                <button 
                  className='boton__modal'
                  onClick={handleClick} 
                  
                >
                    <img className='logotecadoi2' src="/assets/primeraPalabra.svg"/>
                </button>  
              <div 
              className='contenido__we'
                style={{ 
                  width: `${divWidth}px`, // Cambiar height a width
                  height: '550px', // Establecer una altura fija para el div
                   
                  transition: 'width 0.5s ease', // Cambia la duración según sea necesario
                  overflow: 'hidden' 
                }}
              >


                {/* Contenido del div expandido (opcional) */}
                 {/* Otros enlaces de alumno */}
    {user && (
      <div className="flex items-center space-x-4">
        <span className="text-white">Bienvenido, {user.username}</span>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded"
        >
          Cerrar sesión
        </button>
      </div>
    )}

                



              </div>

              
      </div>

    
    </>





  )
}

export default StudentLayout