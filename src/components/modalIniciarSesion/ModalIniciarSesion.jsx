import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ModalRegistrarUsuario from '../modalRegistro/ModalRegistrarse';
import authService from '../../services/authService';
import './ModalIniciarSesion.css';

export default function IniciarSesionModal() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Asegurarse de que los modales estén limpios al montar el componente
  useEffect(() => {
    return () => {
      // Limpiar al desmontar el componente
      forceCleanupModals();
    };
  }, []);

  // Función para forzar la limpieza completa de modales y restaurar el scroll
  const forceCleanupModals = () => {
    // Remover todos los backdrops
    document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
    
    // Restaurar el body a su estado normal
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    
    // Asegurarse de que no hay ningún estilo inline que bloquee el scroll
    document.body.removeAttribute('style');
    
    // Forzar el desbloqueo del scroll
    document.documentElement.style.overflow = '';
    document.documentElement.style.paddingRight = '';
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await authService.login(username, password);
      
      // Obtener datos del usuario autenticado
      const user = authService.getCurrentUser();
      console.log("Usuario autenticado:", user);

      // Cerrar el modal correctamente y limpiar todos los elementos de modal
      const closeModalAndCleanup = () => {
        // Cerrar el modal de manera adecuada con Bootstrap
        const modal = document.getElementById('iniciarSesion');
        if (modal) {
          const modalInstance = window.bootstrap?.Modal.getInstance(modal);
          if (modalInstance) {
            modalInstance.hide();
          } else {
            modal.classList.remove('show');
            modal.style.display = 'none';
            modal.setAttribute('aria-hidden', 'true');
            modal.removeAttribute('aria-modal');
          }
        }
        
        // Forzar la limpieza completa
        forceCleanupModals();
      };
      
      // Ejecutar la limpieza
      closeModalAndCleanup();
      
      // Forzar el desbloqueo del scroll después de un breve retraso
      for (let i = 1; i <= 5; i++) {
        setTimeout(forceCleanupModals, i * 100);
      }
      
      // Añadir una pequeña espera antes de navegar para asegurar que la limpieza se completa
      setTimeout(() => {
        // Redireccionar a la página de usuario
        navigate("/usuario");
        
        // Aplicar una última limpieza después de la navegación
        setTimeout(forceCleanupModals, 200);
      }, 300);
    } catch (error) {
      console.error("Error en login:", error);
      if (error.response) {
        // El servidor respondió con un código de error
        setError(error.response.data || "Credenciales incorrectas. Por favor, inténtalo de nuevo.");
      } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta
        setError("No se pudo conectar con el servidor. Inténtalo de nuevo más tarde.");
      } else {
        // Error al configurar la solicitud
        setError("Error al procesar la solicitud. Por favor, inténtalo de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>    
      <div className="modal fade" id="iniciarSesion" tabIndex="-1" aria-labelledby="modal" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="titulo-modal-cc">Iniciar sesión</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="usernameLogin" className="col-form-label">Correo Electrónico o Usuario:</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="usernameLogin" 
                    required 
                    placeholder="Ingresa tu correo electrónico o nombre de usuario" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="passwordLogin" className="col-form-label">Contraseña:</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    id="passwordLogin" 
                    required 
                    placeholder="Ingresa tu contraseña" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                  />
                </div>

                <div className="opcion-registrarse">
                  <p>Si no tienes una cuenta, regístrate 
                    <span data-bs-toggle="modal" data-bs-target="#registrarme" className="opcion-de-registro"> aquí</span>
                  </p>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-outline-success w-100"
                  disabled={loading}
                >
                  {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ModalRegistrarUsuario />
    </>
  );
}
