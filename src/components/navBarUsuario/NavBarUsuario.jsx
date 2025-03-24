import React, { useEffect, useState } from 'react';
import './NavBarUsuario.css';
import logo from '../../assets/logo.png';
import UsuarioInfoModal from '../modalInfoUsuario/ModalInfoUsuario';

export default function NavBarUsuario() {
    const [usuarioData, setUsuarioData] = useState(null);

    useEffect(() => {
        // Función para obtener la información del usuario que inició sesión
        async function fetchUsuarioData() {
            try {
                const response = await fetch('http://tu-backend-api.com/usuario-sesion'); // Cambia la URL al endpoint de tu API
                const data = await response.json();
                setUsuarioData(data); // Guardar la información del usuario
            } catch (error) {
                console.error('Error al obtener información del usuario:', error);
            }
        }
        fetchUsuarioData();
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
                    <a
                        className="btn"
                        data-bs-toggle="modal"
                        data-bs-target="#informacionUsuario"
                    >
                        <div className="d-flex contenedor-informacion-usuario-nav">
                            <p className="nombre-usuario-campo-conecta">
                                Bienvenido {usuarioData ? usuarioData.nombre : 'Cargando...'}
                            </p>
                            <img
                                src={usuarioData ? usuarioData.foto : 'ruta/por-defecto.png'}
                                alt="Foto Usuario"
                                width="50"
                                height="50"
                                className="d-inline-block align-text-top imagen-usuario-cc"
                            />
                        </div>
                    </a>
                </div>
            </nav>
            <UsuarioInfoModal userId={usuarioData ? usuarioData.id : null} />
        </>
    );
}