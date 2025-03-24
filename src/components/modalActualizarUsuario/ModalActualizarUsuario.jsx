import React, { useEffect, useState } from 'react';

export default function ModalActualizarUsuario() {
  const [userData, setUserData] = useState({
    id: '', // Identificador único del usuario
    nombreCompleto: '',
    cedula: '',
    tipoDocumento: 'cc',
    direccion: '',
    telefono: '',
    imagen: null,
    email: '',
    password: '',
    tieneNegocio: null,
  });

  // Obtener los datos del usuario desde el backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/usuario'); // URL del backend
        const data = await response.json();
        setUserData({
          id: data.id, // Incluye el identificador único
          nombreCompleto: data.nombreCompleto,
          cedula: data.cedula,
          tipoDocumento: data.tipoDocumento,
          direccion: data.direccion,
          telefono: data.telefono,
          imagen: data.imagen,
          email: data.email,
          password: data.password,
          tieneNegocio: data.tieneNegocio,
        });
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    fetchUserData();
  }, []);

  // Manejo de cambios en los campos
  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/usuario/${userData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        alert('Datos actualizados correctamente');
      } else {
        alert('Error al actualizar los datos');
      }
    } catch (error) {
      console.error('Error al actualizar los datos:', error);
    }
  };

  return (
    <div className="modal fade" id="actualizar-info-usuario" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Actualizar Información del Usuario</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="nombreCompleto" className="col-form-label">Nombre Completo:</label>
                <input
                  type="text"
                  className="form-control"
                  id="nombreCompleto"
                  value={userData.nombreCompleto}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="cedula" className="col-form-label">Cédula:</label>
                <input
                  type="text"
                  className="form-control"
                  id="cedula"
                  value={userData.cedula}
                  onChange={handleChange}
                  readOnly
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="tipoDocumento" className="col-form-label">Tipo de Documento:</label>
                <select
                  className="form-select"
                  id="tipoDocumento"
                  value={userData.tipoDocumento}
                  onChange={handleChange}
                  required
                >
                  <option value="cc">Cédula de Ciudadanía</option>
                  <option value="ti">Tarjeta de Identidad</option>
                  <option value="pasaporte">Pasaporte</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="direccion" className="col-form-label">Dirección:</label>
                <input
                  type="text"
                  className="form-control"
                  id="direccion"
                  value={userData.direccion}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="telefono" className="col-form-label">Teléfono:</label>
                <input
                  type="tel"
                  className="form-control"
                  id="telefono"
                  value={userData.telefono}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="imagen" className="col-form-label">Imagen:</label>
                <input
                  type="file"
                  className="form-control"
                  id="imagen"
                  onChange={(e) => setUserData({ ...userData, imagen: e.target.files[0] })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="col-form-label">Correo Electrónico:</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={userData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="col-form-label">Contraseña:</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={userData.password}
                  onChange={handleChange}
                  readOnly
                  required
                />
              </div>
              <div className="mb-3">
                <label className="col-form-label">¿Tienes al menos un negocio?</label>
                <div>
                  <input
                    type="radio"
                    id="negocioSi"
                    name="negocio"
                    value="si"
                    checked={userData.tieneNegocio === 'si'}
                    onChange={(e) => setUserData({ ...userData, tieneNegocio: e.target.value })}
                    required
                  />
                  <label htmlFor="negocioSi">Sí</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="negocioNo"
                    name="negocio"
                    value="no"
                    checked={userData.tieneNegocio === 'no'}
                    onChange={(e) => setUserData({ ...userData, tieneNegocio: e.target.value })}
                    required
                  />
                  <label htmlFor="negocioNo">No</label>
                </div>
              </div>
              <button type="submit" className="btn btn-primary w-100">Actualizar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}