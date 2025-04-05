import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MarketplacePage from "./pages/MarketplacePage";
import AddProduct from "./pages/AddProduct";
import Admin from "./pages/VistaAdminPage";
import UsuarioLogeadoPage from "./pages/UsuarioLogeadoPage";
import SobreNosotros from './pages/NosotrosPage'
import GraficasDatos from './pages/GraficasDatos'
import GraficasDatosEnergia from './pages/GraficasDatosEnergia'
import RegistroProduccionConsumo from './pages/RegistroProduccionConsumo'
import authService from './services/authService';
import "bootstrap/dist/js/bootstrap.bundle.min";

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';

// Ejemplo si el archivo está en src/components
import NoticiaDetalle from './pages/NoticiaDetalle';




// Componente para rutas protegidas
const ProtectedRoute = ({ children, requiredRole = null }) => {
  const currentUser = authService.getCurrentUser();
  const isAuthenticated = !!currentUser;
  
  // Si no está autenticado, redirigir a la página de inicio
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  // Si se requiere un rol específico y el usuario no lo tiene, redirigir a la página de usuario
  if (requiredRole && currentUser.rol !== requiredRole) {
    return <Navigate to="/usuario" replace />;
  }
  
  // Si está autenticado y tiene el rol requerido (o no se requiere rol), mostrar el contenido
  return children;
};

// Componente para eliminar cualquier modal backdrop al cargar
function ModalBackdropCleaner() {
  useEffect(() => {
    // Eliminar cualquier backdrop de modal que pueda haber quedado
    const removeModalBackdrop = () => {
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.body.removeAttribute('style');
      document.documentElement.style.overflow = '';
      document.documentElement.style.paddingRight = '';
    };
    
    // Ejecutar inmediatamente y también configurar un temporizador para asegurarse
    removeModalBackdrop();
    const timer = setTimeout(removeModalBackdrop, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return null;
}

// Componente para forzar scroll al inicio en cambios de ruta
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    // Cuando cambia la ruta, hacer scroll al inicio
    window.scrollTo(0, 0);
    
    // También asegurarse de que el scroll esté habilitado
    const enableScroll = () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.height = '';
      document.body.removeAttribute('style');
      document.documentElement.removeAttribute('style');
    };
    
    // Ejecutar varias veces para asegurar que se aplique
    enableScroll();
    setTimeout(enableScroll, 100);
    setTimeout(enableScroll, 300);
    setTimeout(enableScroll, 500);
  }, [pathname]);
  
  return null;
}

//En esta parate es donde contrala la vista de las paginas 
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // Verificar autenticación al cargar la app
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated();
      setIsLoggedIn(authenticated);
    };
    
    checkAuth();
    
    // Volver a verificar cuando el localStorage cambie
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  return (

    <AuthProvider>
      <BrowserRouter>
        <ModalBackdropCleaner />
        <ScrollToTop />
      
    

    <Router>
      <Routes>
        <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} /> //aqui maneja la vista principal 
        <Route path="/Marketplace" element={<MarketplacePage />} /> //aqui maneja la vista del mercado

        <Route path="/add-product" element={<AddProduct />} /> //aqui maneja la vista de agregar productos */ 
        <Route path="/admin" element={<Admin />} /> //aqui maneja la vista del administrador */ 
        <Route path="/usuario" element={<UsuarioLogeadoPage />} /> //aqui maneja la vista del usuario */ 
        <Route path="/sobre-nosotros" element={<SobreNosotros />} /> //aqui maneja la vista de información sobre nosotros */ 
        <Route path="/noticia/:id" element={<NoticiaDetalle />} /> //aqui maneja la vista de la noticia */




          <Route 
            path="/add-product" 
            element={
              <ProtectedRoute>
                <AddProduct />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requiredRole="ROLE_ADMIN">
                <Admin />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/usuario" 
            element={
              <ProtectedRoute>
                <UsuarioLogeadoPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/graficas" 
            element={
              <ProtectedRoute>
                <GraficasDatos />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/sobre-nosotros" 
            element={<SobreNosotros />} 
          />
          
          <Route path="/estadisticas-energia" element={<ProtectedRoute><GraficasDatosEnergia /></ProtectedRoute>} />
          <Route path="/registro-produccion-consumo" element={<ProtectedRoute><RegistroProduccionConsumo /></ProtectedRoute>} />
       </Routes>
    </Router>  
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
