// src/components/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Texto.css';
const Textos = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/subir');
  };

  return (
    <div className='padre_padre'>
      <div className='Padre_hijo'>
                <div className='botongeneral'>
                    <button className='botogeneraldentro' onClick={handleButtonClick} >
                      <div className='imagen_del_libro'>
                        <img className='imagene' src="/assets/libro.svg"/>
                      </div>
                      <div className='nombre-t'>
                        <p className='nombretexto'>Fabula 1</p>
                      </div>      
                    </button>
                 </div>

                 <div className='botongeneral'>
                    <button className='botogeneraldentro' >
                      <div className='imagen_del_libro'>
                        <img className='imagene' src="/assets/libro.svg"/>
                      </div>
                      <div className='nombre-t'>
                        <p className='nombretexto'>Fabula 2</p>
                      </div>      
                    </button>
                 </div>

                 <div className='botongeneral'>
                    <button className='botogeneraldentro' >
                      <div className='imagen_del_libro'>
                        <img className='imagene' src="/assets/libro.svg"/>
                      </div>
                      <div className='nombre-t'>
                        <p className='nombretexto'>Fabula 3</p>
                      </div>      
                    </button>
                 </div>
                 <div className='botongeneral'>
                    <button className='botogeneraldentro' >
                      <div className='imagen_del_libro'>
                        <img className='imagene' src="/assets/libro.svg"/>
                      </div>
                      <div className='nombre-t'>
                        <p className='nombretexto'>Fabula 4</p>
                      </div>      
                    </button>
                 </div>

                 <div className='botongeneral'>
                    <button className='botogeneraldentro' >
                      <div className='imagen_del_libro'>
                        <img className='imagene' src="/assets/libro.svg"/>
                      </div>
                      <div className='nombre-t'>
                        <p className='nombretexto'>Fabula 5</p>
                      </div>      
                    </button>
                 </div>

                 <div className='botongeneral'>
                    <button className='botogeneraldentro' >
                      <div className='imagen_del_libro'>
                        <img className='imagene' src="/assets/libro.svg"/>
                      </div>
                      <div className='nombre-t'>
                        <p className='nombretexto'>Fabula 6</p>
                      </div>      
                    </button>
                 </div>

                 <div className='botongeneral'>
                    <button className='botogeneraldentro' >
                      <div className='imagen_del_libro'>
                        <img className='imagene' src="/assets/libro.svg"/>
                      </div>
                      <div className='nombre-t'>
                        <p className='nombretexto'>Fabula 7</p>
                      </div>      
                    </button>
                 </div>
                              
      </div>
      
    </div>
  );
};

export default Textos;