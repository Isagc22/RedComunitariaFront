import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './NavBarUsuario.css';
import logo from '../../assets/logo.png';
import logoUsuario from '../../assets/usuarioLogo.png';
import authService from '../../services/authService';
import UsuarioInfoModal from '../modalInfoUsuario/ModalInfoUsuario';

export default function NavBarUsuario() {
  const [userData, setUserData] = useState(null);
  const [datosPersonales, setDatosPersonales] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener datos del usuario autenticado
    const user = authService.getCurrentUser();
    if (user) {
      setUserData(user);
    }

    // También intentamos obtener datos personales si existen
    const storedDatosPersonales = localStorage.getItem('datosPersonales');
    if (storedDatosPersonales && storedDatosPersonales !== 'null') {
      setDatosPersonales(JSON.parse(storedDatosPersonales));
    }
    
    // Asegurarse de que bootstrap esté inicializado correctamente
    // Esto ayuda a que los dropdowns funcionen correctamente
    const initBootstrapComponents = () => {
      if (window.bootstrap && window.bootstrap.Dropdown) {
        const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
        [...dropdownElementList].map(dropdownToggleEl => new window.bootstrap.Dropdown(dropdownToggleEl));
      } else {
        // Si bootstrap no está listo, intentar de nuevo en 100ms
        setTimeout(initBootstrapComponents, 100);
      }
    };
    
    initBootstrapComponents();
  }, []);

  const handleLogout = () => {
    // Cerrar sesión y redirigir a la página principal
    authService.logout();
    navigate('/');
    // Recargar la página para asegurar que los componentes se actualicen
    window.location.reload();
  };

  // Función para navegar sin perder la sesión
  const handleNavigation = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  // Determinar qué nombre mostrar
  const displayName = datosPersonales?.nombre_completo || userData?.username || 'Usuario';
  
  // Verificar si el usuario tiene rol de administrador
  const isAdmin = userData?.rol === "ROLE_ADMIN";

  return (
    <>
      <nav className="navbar bg-body-tertiary navbar-campo-conecta">
        <div className="container-fluid contenedor-info-nav">
          <a 
            className="navbar-brand navbar-cc-principal" 
            href="/"
            onClick={(e) => handleNavigation(e, '/')}
          >
            <img
              src={logo}
              alt="Logo"
              width="100"
              height="100"
              className="d-inline-block align-text-top"
            />
            <p className="nombre-campo-conecta">Campo Conecta</p>
          </a>
          <div className="d-flex align-items-center">
            {/* Menú de navegación para usuario autenticado */}
            <div className="me-4">
              <a 
                href="/" 
                className="nav-link"
                onClick={(e) => handleNavigation(e, '/')}
              >
                Inicio
              </a>
            </div>
            <div className="me-4">
              <Link to="/marketplace" className="nav-link">Marketplace</Link>
            </div>
            <div className="me-4">
              <Link to="/perfil" className="nav-link">Mi Perfil</Link>
            </div>
            
            {/* Enlace a Gráficas */}
            <div className="me-4">
              <Link to="/graficas" className="nav-link">Estadísticas</Link>
            </div>
            
            {/* Menú desplegable para Energía */}
            <div className="dropdown me-4">
              <button
                className="btn btn-link nav-link dropdown-toggle"
                type="button"
                id="dropdownEnergia"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Energía
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownEnergia">
                <li>
                  <Link to="/registro-produccion-consumo" className="dropdown-item">Registrar Datos</Link>
                </li>
                <li>
                  <Link to="/estadisticas-energia" className="dropdown-item">Ver Estadísticas</Link>
                </li>
              </ul>
            </div>
            
            {/* Enlace a Admin solo para usuarios con rol de administrador */}
            {isAdmin && (
              <div className="me-4">
                <a 
                  href="/admin" 
                  className="nav-link"
                  onClick={(e) => handleNavigation(e, '/admin')}
                >
                  Administración
                </a>
              </div>
            )}
            
            {/* Botón de cerrar sesión siempre visible */}
            <div className="me-4">
              <button 
                onClick={handleLogout}
                className="btn btn-outline-danger btn-sm"
              >
                Cerrar Sesión
              </button>
            </div>
            
            {/* Información del usuario */}
            <div className="dropdown">
              <button
                className="btn dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="d-flex contenedor-informacion-usuario-nav">
                  <p className="nombre-usuario-campo-conecta me-2">
                    Bienvenido {displayName}
                  </p>
                  <img
                    src={datosPersonales?.imagen || logoUsuario}
                    alt="Foto Usuario"
                    width="50"
                    height="50"
                    className="d-inline-block align-text-top imagen-usuario-cc"
                  />
                </div>
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                <li>
                  <button 
                    className="dropdown-item" 
                    data-bs-toggle="modal" 
                    data-bs-target="#informacionUsuario"
                  >
                    Ver perfil
                  </button>
                </li>
                {isAdmin && (
                  <li>
                    <button 
                      className="dropdown-item" 
                      onClick={(e) => handleNavigation(e, '/admin')}
                    >
                      Panel de administración
                    </button>
                  </li>
                )}
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button 
                    className="dropdown-item text-danger" 
                    onClick={handleLogout}
                  >
                    Cerrar sesión
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <UsuarioInfoModal userId={userData?.idUsuario || null} />
    </>
  );
}
