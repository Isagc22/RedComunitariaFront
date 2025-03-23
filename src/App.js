import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MarketplacePage from "./pages/MarketplacePage";
import AddProduct from "./pages/AddProduct";


//En esta parate es donde contrala la vista de las paginas 
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Aquí se maneja el login

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} /> //aqui maneja la vista principal 
        <Route path="/Marketplace" element={<MarketplacePage />} /> //aqui maneja la vista del mercado

        <Route path="/add-product" element={<AddProduct />} /> //aqui maneja la vista de agregar productos */ 
      </Routes>
    </Router>   
  );
}

export default App;
