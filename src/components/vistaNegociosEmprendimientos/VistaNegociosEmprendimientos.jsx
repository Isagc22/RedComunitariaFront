import React, { useState, useEffect } from "react";
import './VistaNegociosEmprendimientos.css';

export default function VistaNegociosEmprendimientos() {
    // Estados para la tabla y modal
    const [emprendimientos, setEmprendimientos] = useState([]); // Lista de emprendimientos
    const [paginaActual, setPaginaActual] = useState(0); // Página actual
    const [totalPaginas, setTotalPaginas] = useState(0); // Total de páginas
    const [tipo, setTipo] = useState(""); // Tipo para el modal
    const [nombre, setNombre] = useState(""); // Nombre para el modal
    const [id, setId] = useState(null); // ID para el modal

    // Función para abrir el modal
    const abrirModal = (tipoEntidad, nombreEntidad, idEntidad) => {
        setTipo(tipoEntidad);
        setNombre(nombreEntidad);
        setId(idEntidad);
    };

    // Función para obtener datos del backend
    const obtenerEmprendimientos = async (pagina) => {
        try {
            const response = await fetch(
                `/api/emprendimientos?page=${pagina}&size=10`
            );
            const data = await response.json();
            setEmprendimientos(data.content); // Datos de emprendimientos
            setPaginaActual(data.number); // Página actual
            setTotalPaginas(data.totalPages); // Total de páginas
        } catch (error) {
            console.error("Error al obtener los emprendimientos:", error);
        }
    };

    // Llamar a la API al cargar el componente
    useEffect(() => {
        obtenerEmprendimientos(paginaActual);
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
            <section className="vista-negocios">
                <div className="contenedor">
                    <h2>Vista listado negocios</h2>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Tipo</th>
                                <th>Fecha de creación</th>
                                <th>Estado</th>
                                <th>Imagen</th>
                                <th>Ubicación</th>
                                <th>Producción/Consumo Energía</th>
                                <th>Historial</th>
                                <th>Opciones Negocio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {emprendimientos.map((emprendimiento, index) => (
                                <tr key={emprendimiento.id}>
                                    <td>{index + 1 + paginaActual * 10}</td>
                                    <td>{emprendimiento.nombre}</td>
                                    <td>{emprendimiento.descripcion}</td>
                                    <td>{emprendimiento.tipo}</td>
                                    <td>{emprendimiento.fechaCreacion}</td>
                                    <td>{emprendimiento.estado}</td>
                                    <td>
                                        <img
                                            src={emprendimiento.imagen}
                                            alt="Imagen del negocio"
                                            width="50"
                                            height="50"
                                        />
                                    </td>
                                    <td>{emprendimiento.ubicacion}</td>
                                    <td>{emprendimiento.produccionConsumoEnergia}</td>
                                    <td>{emprendimiento.historial}</td>
                                    <td className="opciones-negocios">
                                        <div className="leer-negocio">
                                            <i className="bi bi-eye"></i>
                                        </div>
                                        <div
                                            className="actualizar-negocio"
                                            data-bs-toggle="modal"
                                            data-bs-target="#actualizar-info-negocio"
                                        >
                                            <i className="bi bi-pencil"></i>
                                        </div>
                                        <div
                                            className="eliminar-negocio"
                                            data-bs-toggle="modal"
                                            data-bs-target="#eliminar"
                                            onClick={() =>
                                                abrirModal("negocio", emprendimiento.nombre, emprendimiento.id)
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
        </>
    );
}