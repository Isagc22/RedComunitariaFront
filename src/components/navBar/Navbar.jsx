import React from "react";
import logo from "../../assets/logo.png";
import IniciarSesionModal from "../modalIniciarSesion/ModalIniciarSesion";
import RegistrarmeModal from "../modalRegistro/ModalRegistrarse";
import "./Navbar.css";

export default function Navbar() {
    return (
        <>
            {/* Si usas la clase fixed-top de Bootstrap (Opción 1) */}
            {/* <nav className="navbar navbar-campo-conecta fixed-top"> */}
            {/* O si usas solo tu clase personalizada (Opción 2) */}
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
                    <div className="d-flex contenedor-btns-nav">
                        <button
                            type="button"
                            className="btn btn-outline-dark btn-iniciar-sesion"
                            data-bs-toggle="modal"
                            data-bs-target="#iniciarSesion"
                        >
                            <i className="bi bi-person-plus"></i> Iniciar sesión
                        </button>

                        <button
                            type="button"
                            className="btn btn-outline-dark btn-registrarme"
                            data-bs-toggle="modal"
                            data-bs-target="#registrarme"
                        >
                            <i className="bi bi-person-plus"></i> Regístrate
                        </button>
                    </div>
                </div>
            </nav>

            {/* Modales */}
            <IniciarSesionModal />
            <RegistrarmeModal />
        </>
    );
}
