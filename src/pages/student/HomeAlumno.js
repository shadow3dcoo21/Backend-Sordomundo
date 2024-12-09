import React, { useEffect, useState } from 'react';
import { USER_PROFILE_URL } from '../../services/apiJWTServices'; // Importar la variable de la URL
function HomeAlumno() {
  const [userData, setUserData] = useState(null);  // Para almacenar los datos del usuario
  const [loading, setLoading] = useState(true);  // Para controlar el estado de carga
  const [error, setError] = useState(null);  // Para manejar errores

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('authToken');  // Obtener el token desde el almacenamiento local

      if (!token) {
        setError('No se encontró el token');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(USER_PROFILE_URL, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,  // Incluir el token en el encabezado
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener los datos del perfil');
        }

        const data = await response.json();
        console.log("Datos recibidos:", data);  // Depuración: Verificar los datos recibidos
        setUserData(data.user);  // Guardar los datos del usuario
      } catch (err) {
        setError(err.message);  // Manejar errores
      } finally {
        setLoading(false);  // Cambiar el estado de carga a falso
      }
    };

    fetchUserProfile();
  }, []);  // El efecto se ejecuta solo una vez cuando el componente se monta

  // Mostrar un mensaje de carga mientras se obtienen los datos
  if (loading) {
    return <div>Loading...</div>;
  }

  // Mostrar un mensaje de error si ocurre algo durante la solicitud
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Mostrar los datos del usuario
  return (
    <div>
    <h1>Hola, {userData?.firstName} {userData?.lastName}</h1> {/* Mostrar el nombre completo */}
    <p>Usuario: {userData?.username}</p>  {/* Mostrar el nombre de usuario */}
    <p>Email: {userData?.email}</p>      {/* Mostrar el correo electrónico */}
    <p>Sexo: {userData?.sex}</p>        {/* Mostrar el sexo */}
    <p>Rol: {userData?.role}</p>        {/* Mostrar el rol del usuario */}
  </div>
  );
}

export default HomeAlumno;
