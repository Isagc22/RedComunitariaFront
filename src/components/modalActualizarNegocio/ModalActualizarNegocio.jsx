import React, { useState, useEffect } from "react";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min";

export default function ModalActualizarNegocio({ negocioSeleccionado }) {
  const [negocioData, setNegocioData] = useState({
    id: "",
    nombreEmprendimiento: "",
    descripcion: "",
    tipo: "",
    fechaCreacion: "",
    estado: "Activo",
    imagen: null,
    region: "",
    produccion: "",
    consumoEnergia: "",
    pais: "",
    cantidadNegocios: "",
    fechaNacimiento: "",
  });

  useEffect(() => {
    if (negocioSeleccionado) {
      setNegocioData({ ...negocioSeleccionado, imagen: null });
    }
  }, [negocioSeleccionado]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setNegocioData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleImageUpload = (e) => {
    setNegocioData((prevData) => ({
      ...prevData,
      imagen: e.target.files[0] || null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(negocioData).forEach((key) => {
        if (negocioData[key] !== null && negocioData[key] !== "") {
          formData.append(key, negocioData[key]);
        }
      });

      const response = await fetch(`http://localhost:8080/emprendimientos/${negocioData.id}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        alert("Negocio actualizado correctamente");
        const modalElement = document.getElementById("actualizar-negocio");
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) modalInstance.hide();
      } else {
        alert("Error al actualizar el negocio");
      }
    } catch (error) {
      console.error("Error al actualizar el negocio:", error);
      alert("Hubo un problema con la actualización");
    }
  };

  return (
    <div className="modal fade" id="actualizar-negocio" tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="modalLabel">Actualizar Negocio/Emprendimiento</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="nombreEmprendimiento" className="col-form-label">Nombre Negocio:</label>
                <input type="text" className="form-control" id="nombreEmprendimiento" value={negocioData.nombreEmprendimiento} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="descripcion" className="col-form-label">Descripción:</label>
                <textarea className="form-control" id="descripcion" value={negocioData.descripcion} onChange={handleChange} required></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="tipo" className="col-form-label">Tipo:</label>
                <input type="text" className="form-control" id="tipo" value={negocioData.tipo} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="fechaCreacion" className="col-form-label">Fecha de Creación:</label>
                <input type="date" className="form-control" id="fechaCreacion" value={negocioData.fechaCreacion} onChange={handleChange} required max="2025-12-31" />
              </div>
              <div className="mb-3">
                <label className="col-form-label">Estado:</label>
                <div>
                  <input type="radio" id="estadoActivo" name="estado" value="Activo" checked={negocioData.estado === "Activo"} onChange={handleChange} />
                  <label htmlFor="estadoActivo">Activo</label>
                </div>
                <div>
                  <input type="radio" id="estadoInactivo" name="estado" value="Inactivo" checked={negocioData.estado === "Inactivo"} onChange={handleChange} />
                  <label htmlFor="estadoInactivo">Inactivo</label>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="imagen" className="col-form-label">Imagen:</label>
                <input type="file" className="form-control" id="imagen" onChange={handleImageUpload} />
              </div>
              <div className="mb-3">
                <label htmlFor="region" className="col-form-label">Región:</label>
                <input type="text" className="form-control" id="region" value={negocioData.region} onChange={handleChange} required />
              </div>
              <button type="submit" className="btn btn-primary w-100">Actualizar Negocio</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
