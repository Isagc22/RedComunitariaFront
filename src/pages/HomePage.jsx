import React, { useState, useEffect } from "react";
import NavBar from "../components/navBar/Navbar";
import NavBarUsuario from "../components/navBarUsuario/NavBarUsuario";
import Banner from "../components/banner/Banner";
import FooterPage from "../components/footer/Footer";
import ContentSection from "../components/cardsDescubre/ContentSection";
import TestimonialSection from "../components/testimonios/TestimonialSection";
import AboutSection from "../components/AboutSection/AboutSection";
import NewsFeed from "../components/AboutSection/NewsFeed";




const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    
    // Si el usuario existe y no está vacío, actualiza el estado
    if (user && user !== "null") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
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
