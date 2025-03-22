import React from 'react'
import './NavBarUsuario.css'
import logo from '../../assets/logo.png'
import logoUsuario from '../../assets/usuarioLogo.png'
import UsuarioInfoModal from '../modalInfoUsuario/ModalInfoUsuario'
// import RegistroNegocio from '../modalRegistroNegocio/ModalRegistroNegocio'




export default function NavBarUsuario() {
    let nombreUsuario = 'Isabela G'
    return (
        <>    <nav className="navbar bg-body-tertiary navbar-campo-conecta">
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


                <a
                           
                            className="btn"
                            data-bs-toggle="modal"
                            data-bs-target="#informacionUsuario"
                        >
                   

                <div className="d-flex contenedor-informacion-usuario-nav">

                    <p className="nombre-usuario-campo-conecta">Bienvenido {nombreUsuario}</p>
                    <img
                        src={logoUsuario}
                        alt="Logo"
                        width="50"
                        height="50"
                        className="d-inline-block align-text-top imagen-usuario-cc"
                    />


                </div>
         
                        </a>
            </div>
        </nav>
            <UsuarioInfoModal />
            {/* <RegistroNegocio /> */}

        </>
    )
}
