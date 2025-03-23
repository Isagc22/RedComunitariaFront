import React from "react";
import NavBar from "./components/navBar/Navbar";
import NavBarUsuario from "./components/navBarUsuario/NavBarUsuario";
import LandingSection from "./components/mainSections/LandingSection";
import ContentSection from "./components/mainSections/ContentSection";
import TestimonialSection from "./components/mainSections/TestimonialSection";

function App() {
  const isLoggedIn = false; // Cambia esto según el login real

  return (
    <div className="App">
      {/* Manejamos la barra de navegación aquí */}
      {isLoggedIn ? <NavBarUsuario /> : <NavBar />}

      {/* Secciones principales */}
      <LandingSection />

      <ContentSection
        title="How It Works"
        text="Te ayudamos a conectar tu negocio con el mundo digital."
        showButton={true}
      />

      <ContentSection
        title="Pricing"
        text="Nuestros servicios son asequibles para todas las comunidades."
        showButton={false}
      />

      <TestimonialSection 
        title="Testimonios"
        text="Esto es un testimonio"
        showButton={false}/>

    </div>
  );
}

export default App;
