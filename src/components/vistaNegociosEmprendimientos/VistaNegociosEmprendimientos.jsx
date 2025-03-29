import React, { useState, useEffect } from "react"; 
import "./VistaNegociosEmprendimientos.css";
import ModalActualizarNegocio from "../modalActualizarNegocio/ModalActualizarNegocio";
import ModalEliminarNegocio from "../modalEliminarNegocio/ModalEliminarNegocio";

export default function VistaNegociosEmprendimientos() {
  const [emprendimientos, setEmprendimientos] = useState([]);
  const [tipo, setTipo] = useState("");
  const [nombre, setNombre] = useState("");
  const [id, setId] = useState(null);

  // Función para abrir el modal de eliminación
  const abrirModal = (tipoEntidad, nombreEntidad, idEntidad) => {
    setTipo(tipoEntidad);
    setNombre(nombreEntidad);
    setId(idEntidad);
  };

  // Obtener datos del backend
  const obtenerEmprendimientos = async () => {
    try {
      const response = await fetch(`http://localhost:8080/emprendimientos`);
      const data = await response.json();
      setEmprendimientos(data.content || data || []);
    } catch (error) {
      console.error("Error al obtener los emprendimientos:", error);
    }
  };

  const eliminarNegocio = async () => {
    if (!id) {
      console.error("Error: No se ha seleccionado un negocio para eliminar.");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:8080/emprendimientos/${id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        console.log(`Negocio con ID ${id} eliminado correctamente.`);
        setEmprendimientos(emprendimientos.filter(dato => dato.id !== id));
      } else {
        console.error("Error al eliminar el negocio. Verifica el backend.");
      }
    } catch (error) {
      console.error("Error en la petición de eliminación:", error);
    }
  };
  

  useEffect(() => {
    obtenerEmprendimientos();
  }, []);

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
                  <td>{index + 1}</td>
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
                      onClick={() =>
                        abrirModal("negocio", emprendimiento.nombre, emprendimiento.id)
                      }
                      data-bs-toggle="modal"
                      data-bs-target="#eliminar-negocio"
                    >
                      <i className="bi bi-trash"></i>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Modal para eliminar */}
      <ModalEliminarNegocio tipo={tipo} nombre={nombre} onEliminar={eliminarNegocio} />

      <ModalActualizarNegocio />
    </>
  );
}
