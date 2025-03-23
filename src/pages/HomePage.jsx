import React from "react";
import NavBar from "../components/navBar/Navbar";
import NavBarUsuario from "../components/navBarUsuario/NavBarUsuario";
import LandingSection from "../components/mainSections/LandingSection";
import FooterPage from "../components/footer/Footer"
import ContentSection from "../components/mainSections/ContentSection";
import TestimonialSection from "../components/mainSections/TestimonialSection";
import GraficaImg from '../components/graficasProductos/GraficasProductos'


// Página principal de la aplicación
// Se muestra el contenido principal de la página de inicio
const HomePage = ({ isLoggedIn }) => {
  return (
    <div className="HomePage">
      {/* Mostramos la barra correspondiente */}
      {isLoggedIn ? <NavBarUsuario /> : <NavBar />}

      {/* Carrusel y contenido */}
      <LandingSection />

      <ContentSection
        title="¿Qué es Campo Conecta?"
        text="Una red social comunitaria que conecta personas, productos y tradiciones del campo colombiano."
        showButton={false}
      />

      {/* <ContentSection
        title="¿Para quién es?"
        text="Para campesinos, productores locales y personas que quieren apoyar las comunidades rurales comprando directamente."
        showButton={false}
      />

      <ContentSection
        title="¿Cómo funciona?"
        text="Los campesinos publican sus productos, los compradores los descubren y pueden contactarlos directamente."
        showButton={true}
      /> */}
      <GraficaImg />
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
