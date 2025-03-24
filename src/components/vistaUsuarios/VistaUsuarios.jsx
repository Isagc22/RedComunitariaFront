import React, { useState, useEffect } from "react";
import './VistaUsuarios.css';
import ModalEliminar from '../modalEliminar/ModalEliminar';
import ModalActualizarUsuario from '../modalActualizarUsuario/ModalActualizarUsuario';

export default function VistaUsuarios() {
    // Estados
    const [usuarios, setUsuarios] = useState([]); // Lista de usuarios
    const [paginaActual, setPaginaActual] = useState(0); // Página actual
    const [totalPaginas, setTotalPaginas] = useState(0); // Total de páginas
    const [tipo, setTipo] = useState(""); // Para el modal
    const [nombre, setNombre] = useState(""); // Para el modal
    const [id, setId] = useState(null); // Para el modal

    // Función para abrir el modal
    const abrirModal = (tipoEntidad, nombreEntidad, idEntidad) => {
        setTipo(tipoEntidad);
        setNombre(nombreEntidad);
        setId(idEntidad);
    };

    // Función para obtener datos del backend
    const obtenerUsuarios = async (pagina) => {
        try {
            const response = await fetch(
                `/api/usuarios?page=${pagina}&size=10` // Ajustar la URL si es necesario
            );
            const data = await response.json();
            setUsuarios(data.content); // Datos de usuarios
            setPaginaActual(data.number); // Página actual
            setTotalPaginas(data.totalPages); // Total de páginas
        } catch (error) {
            console.error("Error al obtener los usuarios:", error);
        }
    };

    // Llamar a la API al cargar el componente
    useEffect(() => {
        obtenerUsuarios(paginaActual);
    }, [paginaActual]);

    // Funciones para cambiar de página
    const irAPaginaAnterior = () => {
        if (paginaActual > 0) {
            setPaginaActual(paginaActual - 1);
        }
    };

    const irAPaginaSiguiente = () => {
        if (paginaActual < totalPaginas - 1) {
            setPaginaActual(paginaActual + 1);
        }
    };

    return (
        <>
            <section className="vista-usuarios">
                <div className="contenedor">
                    <h2>Vista listado usuarios</h2>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Cédula</th>
                                <th>Dirección</th>
                                <th>Imagen</th>
                                <th>Teléfono</th>
                                <th>Correo Electrónico</th>
                                <th>Negocio</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((usuario, index) => (
                                <tr key={usuario.id}>
                                    <td>{index + 1 + paginaActual * 10}</td>
                                    <td>{usuario.nombre}</td>
                                    <td>{usuario.cedula}</td>
                                    <td>{usuario.direccion}</td>
                                    <td>
                                        <img
                                            src={usuario.imagen}
                                            alt="Imagen de usuario"
                                            width="50"
                                            height="50"
                                        />
                                    </td>
                                    <td>{usuario.telefono}</td>
                                    <td>{usuario.correoElectronico}</td>
                                    <td>{usuario.negocio}</td>
                                    <td className="opciones-usuario">
                                        <div className="leer">
                                            <i className="bi bi-eye"></i>
                                        </div>
                                        <div
                                            className="actualizar"
                                            data-bs-toggle="modal"
                                            data-bs-target="#actualizar-info-usuario"
                                        >
                                            <i className="bi bi-pencil"></i>
                                        </div>
                                        <div
                                            className="eliminar-usuario"
                                            data-bs-toggle="modal"
                                            data-bs-target="#eliminar"
                                            onClick={() =>
                                                abrirModal("usuario", usuario.nombre, usuario.id)
                                            }
                                        >
                                            <i className="bi bi-trash"></i>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="paginacion">
                        <button
                            className="btn btn-primary"
                            onClick={irAPaginaAnterior}
                            disabled={paginaActual === 0}
                        >
                            Anterior
                        </button>
                        <span className="pagina-info">
                            Página {paginaActual + 1} de {totalPaginas}
                        </span>
                        <button
                            className="btn btn-primary"
                            onClick={irAPaginaSiguiente}
                            disabled={paginaActual === totalPaginas - 1}
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            </section>

            {/* Modal para eliminar */}
            <ModalEliminar
                tipo={tipo}
                nombre={nombre}
                onEliminar={() => console.log(`Eliminando ${tipo}: ${nombre}`)}
            />

            {/* Modal para actualizar */}
            <ModalActualizarUsuario />
        </>
    );
}