import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Función para verificar la validez de la sesión al iniciar la aplicación
const checkSession = () => {
  // Comentamos estas líneas para evitar cerrar sesión automáticamente al recargar
  // localStorage.removeItem('user');
  // localStorage.removeItem('datosPersonales');
  
  // Verificamos si hay una sesión activa y si ha expirado
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    // Verificar si el token ha expirado (24 horas desde loginTime)
    const loginTime = user.loginTime || 0;
    const currentTime = new Date().getTime();
    const MAX_SESSION_TIME = 24 * 60 * 60 * 1000; // 24 horas en milisegundos
    
    // Si la sesión ha expirado, entonces cerramos sesión
    if (currentTime - loginTime > MAX_SESSION_TIME) {
      console.log('Sesión expirada. Cerrando sesión...');
      localStorage.removeItem('user');
      localStorage.removeItem('datosPersonales');
    }
  }
  
  // Limpiar cualquier estado de modal que pudiera persistir
  document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
  document.body.classList.remove('modal-open');
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
};

// Ejecutar la verificación al cargar la aplicación
checkSession();

// Función para limpiar cualquier backdrop de modal al iniciar la aplicación
const cleanupModals = () => {
  setTimeout(() => {
    document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }, 500);
};

// Ejecutar la limpieza de modales
cleanupModals();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
