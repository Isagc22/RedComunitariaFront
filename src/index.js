import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import NavBar from './components/navBar/Navbar';
import NavBarUsuario from './components/navBarUsuario/NavBarUsuario';
import VistaUsuarios from './components/vistaUsuarios/VistaUsuarios';
import VistaNegocios from './components/vistaNegociosEmprendimientos/VistaNegociosEmprendimientos';





import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NavBar />
    <NavBarUsuario />
    <VistaUsuarios/>
    <VistaNegocios/>



  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
