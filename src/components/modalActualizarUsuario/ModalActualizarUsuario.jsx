import React, { useEffect, useState } from "react";

export default function ModalActualizarUsuario({ usuarioSeleccionado }) {
  // Inicializamos el estado con dos identificadores:
  // - idUsuario: para actualizar el endpoint de /usuarios
  // - idDatos: para actualizar el endpoint de /datosPersonales
  const [userData, setUserData] = useState({
    idUsuario: "",
    idDatos: "",
    nombreCompleto: "",
    cedula: "",
    tipoDocumento: "",
    direccion: "",
    telefono: "",
    imagen: null,
    email: "",
    password: "",
  });

  // Cuando cambia el usuarioSeleccionado, actualizamos el estado
  useEffect(() => {
    if (usuarioSeleccionado) {
      setUserData({
        idUsuario: usuarioSeleccionado.idusuarios || "",  // id para /usuarios
        idDatos: usuarioSeleccionado.iddatospersonales || "", // id para /datosPersonales
        nombreCompleto: usuarioSeleccionado.nombre_completo || "",
        cedula: usuarioSeleccionado.cedula || "",
        tipoDocumento: usuarioSeleccionado.idtipodocumento || "",
        direccion: usuarioSeleccionado.direccion || "",
        telefono: usuarioSeleccionado.telefono || "",
        imagen: null, // Siempre inicializamos en null para la carga nueva
        email: usuarioSeleccionado.emailUser || "", // Si está disponible
        password: usuarioSeleccionado.password_user || "", // Si está disponible
      });
    }
  }, [usuarioSeleccionado]);

  // Manejo de cambios en los campos del formulario
  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleImageUpload = (e) => {
    setUserData((prevData) => ({
      ...prevData,
      imagen: e.target.files[0],
    }));
  };

  // Envío del formulario para actualizar los datos
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Actualizar datos de usuario (correo, contraseña, estado) en el endpoint /usuarios
      const usuarioResponse = await fetch(
        `http://localhost:8080/usuarios/${userData.idUsuario}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            emailUser: userData.email,
            password_user: userData.password,
            estado_user: true,
          }),
        }
      );

      if (!usuarioResponse.ok) {
        throw new Error("Error actualizando usuario");
      }

      // Actualizar datos personales en el endpoint /datosPersonales
      const formData = new FormData();
      formData.append("nombre_completo", userData.nombreCompleto);
      formData.append("cedula", userData.cedula);
      formData.append("direccion", userData.direccion);
      formData.append("telefono", userData.telefono);
      formData.append("idtipodocumento", userData.tipoDocumento);
      if (userData.imagen) formData.append("imagen", userData.imagen);
      // Es posible que también necesites enviar el idusuarios para la actualización en datos personales
      formData.append("idusuarios", userData.idUsuario);

      const datosResponse = await fetch(
        `http://localhost:8080/datosPersonales/${userData.idDatos}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!datosResponse.ok) {
        throw new Error("Error actualizando datos personales");
      }

      alert("Datos actualizados correctamente");
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
      alert("Error al actualizar los datos");
    }
  };

  return (
    
      <div className="modal fade" id="actualizar-info-usuario" tabIndex="-1">

      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Actualizar Información del Usuario
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="nombreCompleto" className="col-form-label">
                  Nombre Completo:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nombreCompleto"
                  value={userData.nombreCompleto}
                  onChange={handleChange}
                
                />
              </div>
              <div className="mb-3">
                <label htmlFor="cedula" className="col-form-label">
                  Cédula:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cedula"
                  value={userData.cedula}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="direccion" className="col-form-label">
                  Dirección:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="direccion"
                  value={userData.direccion}
                  onChange={handleChange}
                
                />
              </div>
              <div className="mb-3">
                <label htmlFor="telefono" className="col-form-label">
                  Teléfono:
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="telefono"
                  value={userData.telefono}
                  onChange={handleChange}
                
                />
              </div>
              <div className="mb-3">
                <label htmlFor="imagen" className="col-form-label">
                  Imagen:
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="imagen"
                  onChange={handleImageUpload}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="col-form-label">
                  Correo Electrónico:
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={userData.email}
                  onChange={handleChange}
                
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="col-form-label">
                  Contraseña:
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={userData.password}
                  onChange={handleChange}
                
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Actualizar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
