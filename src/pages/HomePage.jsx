import React, { useState, useEffect } from "react";
import NavBar from "../components/navBar/Navbar";
import NavBarUsuario from "../components/navBarUsuario/NavBarUsuario";
import Banner from "../components/banner/Banner";
import FooterPage from "../components/footer/Footer";
import ContentSection from "../components/cardsDescubre/ContentSection";
import TestimonialSection from "../components/testimonios/TestimonialSection";
import authService from "../services/authService";
import AboutSection from "../components/aboutSection/AboutSection";
import NewsFeed from "../components/nuevasnoticias/NewsFeed";




const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Verificar autenticación usando el servicio
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
    <div className="HomePage">
      {/* Mostramos la barra correspondiente */}
      {isLoggedIn ? <NavBarUsuario /> : <NavBar />}

      {/* Carrusel y contenido */}
      <Banner />

      <ContentSection
        title="¿Qué es Campo Conecta?"
        text="Una red social comunitaria que conecta personas, productos y tradiciones del campo colombiano."
        showButton={false}
      />

      <AboutSection />

      <NewsFeed />
      

      <TestimonialSection
        title="Testimonios"
        text="Esto es un testimonio real de nuestros usuarios satisfechos."
        showButton={false}
      />

      <FooterPage />
    </div>
  );
};

export default HomePage;
