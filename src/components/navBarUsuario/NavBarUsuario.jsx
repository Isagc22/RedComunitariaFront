import React, { useState, useEffect } from 'react';
import './NavBarUsuario.css';
import logo from '../../assets/logo.png';
import logoUsuario from '../../assets/usuarioLogo.png';

import UsuarioInfoModal from '../modalInfoUsuario/ModalInfoUsuario';

export default function NavBarUsuario() {
  const [usuarioData, setUsuarioData] = useState(null);

  useEffect(() => {
    // Leer el usuario del localStorage si existe
    const storedUser = localStorage.getItem('datosPersonales');
    if (storedUser) {
      setUsuarioData(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
      <nav className="navbar bg-body-tertiary navbar-campo-conecta">
        <div className="container-fluid contenedor-info-nav">
          <a className="navbar-brand navbar-cc-principal" href="#">
            <img
              src={logo}
              alt="Logo"
              width="100"
              height="100"
              className="d-inline-block align-text-top"
            />
            <p className="nombre-campo-conecta">Campo Conecta</p>
          </a>
          {/* Se reemplaza el <a> por un botón para evitar recargas o comportamientos no deseados */}
          <button
            className="btn"
            data-bs-toggle="modal"
            data-bs-target="#informacionUsuario"
          >
            <div className="d-flex contenedor-informacion-usuario-nav">
              <p className="nombre-usuario-campo-conecta">
                Bienvenido {usuarioData ? usuarioData.nombre_completo : 'Invitado'}
              </p>
              <img
                src={usuarioData?.imagen || logoUsuario}
                alt="Foto Usuario"
                width="50"
                height="50"
                className="d-inline-block align-text-top imagen-usuario-cc"
              />


            </div>
          </button>
        </div>
      </nav>
      <UsuarioInfoModal userId={usuarioData ? usuarioData.id : null} />
    </>
  );
}
