import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MarketplacePage from "./pages/MarketplacePage";
import AddProduct from "./pages/AddProduct";
import Admin from "./pages/VistaAdminPage";
import UsuarioLogeadoPage from "./pages/UsuarioLogeadoPage";
import SobreNosotros from './pages/NosotrosPage'

//En esta parate es donde contrala la vista de las paginas 
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Aquí se maneja el login

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} /> //aqui maneja la vista principal 
        <Route path="/Marketplace" element={<MarketplacePage />} /> //aqui maneja la vista del mercado

        <Route path="/add-product" element={<AddProduct />} /> //aqui maneja la vista de agregar productos */ 
        <Route path="/admin" element={<Admin />} /> //aqui maneja la vista del administrador */ 
        <Route path="/usuario" element={<UsuarioLogeadoPage />} /> //aqui maneja la vista del usuario */ 
        <Route path="/sobre-nosotros" element={<SobreNosotros />} /> //aqui maneja la vista de información sobre nosotros */ 



      </Routes>
    </Router>   
  );
}

export default App;
