import React, { useState, useEffect } from 'react';

export default function ModalActualizarNegocio() {
  // Estado inicial del negocio
  const [negocioData, setNegocioData] = useState({
    nombreEmprendimiento: '',
    descripcion: '',
    tipo: '',
    fechaCreacion: '',
    estado: 'Activo',
    imagen: null,
    region: '',
    produccion: '',
    consumoEnergia: '',
    pais: '',
    cantidadNegocios: '',
    fechaNacimiento: ''
  });

  // Obtener los datos del negocio desde el backend
  useEffect(() => {
    const fetchNegocioData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/negocio'); // URL del backend
        const data = await response.json();
        setNegocioData({
          nombreEmprendimiento: data.nombreEmprendimiento,
          descripcion: data.descripcion,
          tipo: data.tipo,
          fechaCreacion: data.fechaCreacion,
          estado: data.estado,
          imagen: data.imagen,
          region: data.region,
          produccion: data.produccion,
          consumoEnergia: data.consumoEnergia,
          pais: data.pais,
          cantidadNegocios: data.cantidadNegocios,
          fechaNacimiento: data.fechaNacimiento
        });
      } catch (error) {
        console.error('Error al obtener los datos del negocio:', error);
      }
    };

    fetchNegocioData();
  }, []);

  // Manejo de cambios en los campos
  const handleChange = (e) => {
    const { id, value } = e.target;
    setNegocioData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/negocio', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(negocioData),
      });
      if (response.ok) {
        alert('Datos del negocio actualizados correctamente');
      } else {
        alert('Error al actualizar los datos del negocio');
      }
    } catch (error) {
      console.error('Error al actualizar los datos del negocio:', error);
    }
  };

  return (
    <div className="modal fade" id="registrar-mi-negocio" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Actualizar Negocio/Emprendimiento</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="nombreEmprendimiento" className="col-form-label">Nombre Negocio/Emprendimiento:</label>
                <input
                  type="text"
                  className="form-control"
                  id="nombreEmprendimiento"
                  value={negocioData.nombreEmprendimiento}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="descripcion" className="col-form-label">Descripción:</label>
                <input
                  type="text"
                  className="form-control"
                  id="descripcion"
                  value={negocioData.descripcion}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="tipo" className="col-form-label">Tipo:</label>
                <input
                  type="text"
                  className="form-control"
                  id="tipo"
                  value={negocioData.tipo}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="fechaCreacion" className="col-form-label">Fecha de creación:</label>
                <input
                  type="date"
                  className="form-control"
                  id="fechaCreacion"
                  value={negocioData.fechaCreacion}
                  onChange={handleChange}
                  required
                  max="2025-12-31"
                />
              </div>
              <div className="mb-3">
                <label className="col-form-label">Estado:</label>
                <div>
                  <input
                    type="radio"
                    id="negocioActivo"
                    name="estado"
                    value="Activo"
                    checked={negocioData.estado === 'Activo'}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="negocioActivo">Activo</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="negocioInactivo"
                    name="estado"
                    value="Inactivo"
                    checked={negocioData.estado === 'Inactivo'}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="negocioInactivo">Inactivo</label>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="imagenNegocio" className="col-form-label">Imagen:</label>
                <input
                  type="file"
                  className="form-control"
                  id="imagenNegocio"
                  onChange={(e) => setNegocioData({ ...negocioData, imagen: e.target.files[0] })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="region" className="col-form-label">Región ubicado:</label>
                <input
                  type="text"
                  className="form-control"
                  id="region"
                  value={negocioData.region}
                  onChange={handleChange}
                  required
                />
              </div>
              <fieldset>
                <div className="mb-3">
                  <label htmlFor="produccion" className="col-form-label">Producción:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="produccion"
                    value={negocioData.produccion}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="consumoEnergia" className="col-form-label">Consumo Energía:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="consumoEnergia"
                    value={negocioData.consumoEnergia}
                    onChange={handleChange}
                    required
                  />
                </div>
              </fieldset>
              <fieldset>
                <div className="mb-3">
                  <label htmlFor="pais" className="col-form-label">País:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="pais"
                    value={negocioData.pais}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="cantidadNegocios" className="col-form-label">Cantidad de negocios:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cantidadNegocios"
                    value={negocioData.cantidadNegocios}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="fechaNacimiento" className="col-form-label">Año que nació:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fechaNacimiento"
                    value={negocioData.fechaNacimiento}
                    onChange={handleChange}
                    required
                  />
                </div>
              </fieldset>
              <button type="submit" className="btn btn-primary w-100">Actualizar Negocio</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
