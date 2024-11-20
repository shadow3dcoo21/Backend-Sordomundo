// /pages/auth/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/authService';
import './style/Login.css';
const Login = () => {

  const [loginType, setLoginType] = useState(''); // 'alumno', 'profesor', 'externo'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const success = await login({ username, password, loginType });
      if (success) {
        navigate(`/${loginType}`);
        console.log("rol : ",loginType);
      } else {
        console.error('Error en el login');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div className="cuerpo-general min-h-screen flex flex-col items-center  justify-center bg-gray-50" style={{
      backgroundImage: `url('/assets/fondo.svg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      
      <div className="titu mb-5  w-3/4">
        <h2 className="text-5xl font-bold p-5 mb-10 generalcolor">Bienvenido a</h2>
      </div>

      <div className="titu mb-5 flex justify-center">
        <img src="/assets/SORDOMUNDO.svg" alt="SVG Image" className="svg-image" />
      </div>

      <div className="hijo w-full  space-y-8 p-8 rounded-lg">
        
        {!loginType ? (
          <div className="space-y-5  p-5">
            <button
              className="w-full p-4 bg-custom-cel text-white rounded-lg text-2xl"
              onClick={() => setLoginType('alumno')}
            >
              Ingresar como Alumno
            </button>
            <button
              className="w-full p-4 bg-green-600 text-white rounded-lg text-2xl"
              onClick={() => setLoginType('profesor')}
            >
              Ingresar como Profesor
            </button>
            <button
              className="w-full p-4 bg-purple-700 text-white rounded-lg text-2xl"
              onClick={() => setLoginType('externo')}
            >
              Ingresar como Usuario Externo
            </button>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4 flex flex-col items-center">
            <div className='input-l'>
              <label className="text-us block text-sm font-medium text-gray-700">
                Usuario:
              </label>
              <input
                type="text"
                value={username}
                placeholder='Ingresa tu usuario'
                onChange={(e) => setUsername(e.target.value)}
                className="usuario-l mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            
            {loginType === 'profesor' && (
              <div className='input-l'>
                <label className="text-us block text-sm font-medium text-gray-700">
                  Contraseña:
                </label>
                <input
                  type="password"
                  value={password}
                  placeholder='Ingresa tu contraseña'
                  onChange={(e) => setPassword(e.target.value)}
                  className=" usuario-l mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              className="input-l p-3 bg-custom-cel text-white hover:bg-blue-700"
            >
              Iniciar Sesión
            </button>

            {loginType === 'externo' && (
              <div className="text-center">
                <a href="/register" className="text-blue-600 hover:text-blue-800">
                  Registrarse como usuario externo
                </a>
              </div>
            )}

            <button
              type="button"
              onClick={() => setLoginType('')}
              className="input-l p-3 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Volver
            </button>
          </form>
        )}
      </div>
      

      
    </div>
  );
};

export default Login;