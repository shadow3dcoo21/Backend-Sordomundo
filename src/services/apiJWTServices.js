// apiJWTServices.js

// URL base del API 
//const BASE_URL = 'https://sordomundo.pro/api';
const BASE_URL = 'http://localhost:5000/api';

// Endpoints específicos

//Autentication
export const USER_LOGIN_URL = `${BASE_URL}/auth/login`; // Login
export const USER_PROFILE_URL = `${BASE_URL}/users/profile`; // Perfil del usuario
export const HOME_DATA_URL = `${BASE_URL}/home`; // Datos de la página Home
export const NOTIFICATIONS_URL = `${BASE_URL}/notifications`; // Notificaciones
export const SETTINGS_URL = `${BASE_URL}/settings`; // Configuración
export const MESSAGES_URL = `${BASE_URL}/messages`; // Mensajes