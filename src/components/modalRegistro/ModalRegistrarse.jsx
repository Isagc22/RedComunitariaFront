import React, { useState } from "react";

export default function RegistrarmeModal() {
  // Estados de Usuario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [idTipoUsuario] = useState(2);

  // Estados de DatosPersonales
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [cedula, setCedula] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [imagen, setImagen] = useState(null);

  const handleImageUpload = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const usuarioResponse = await fetch("http://localhost:8080/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emailUser: email,
          password_user: password,
          estado_user: true,
          idtipousuario: idTipoUsuario,
        }),
      });

      if (!usuarioResponse.ok) throw new Error("Error creando usuario");
      const usuarioData = await usuarioResponse.json();
      if (!usuarioData.idusuarios) throw new Error("El backend no devolvió el ID del usuario.");

      const formData = new FormData();
      formData.append("nombre_completo", nombreCompleto);
      formData.append("cedula", cedula);
      formData.append("direccion", direccion);
      formData.append("telefono", telefono);
      formData.append("idusuarios", usuarioData.idusuarios);
      formData.append("idtipodocumento", tipoDocumento);
      if (imagen) formData.append("imagen", imagen);

      const datosResponse = await fetch("http://localhost:8080/datosPersonales", {
        method: "POST",
        body: formData,
      });

      if (!datosResponse.ok) throw new Error("Error guardando datos personales");
      console.log("Registro exitoso!");
    } catch (error) {
      console.error("Error en el registro:", error);
    }
  };

  return (
    <div className="modal fade" id="registrarme" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Registro</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <h5>Datos de Usuario</h5>
              <div className="mb-3">
                <label className="col-form-label">Correo Electrónico:</label>
                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="col-form-label">Contraseña:</label>
                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              
              <h5>Datos Personales</h5>
              <div className="mb-3">
                <label className="col-form-label">Nombre Completo:</label>
                <input type="text" className="form-control" value={nombreCompleto} onChange={(e) => setNombreCompleto(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="col-form-label">Cédula:</label>
                <input type="text" className="form-control" value={cedula} onChange={(e) => setCedula(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="col-form-label">Dirección:</label>
                <input type="text" className="form-control" value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="col-form-label">Teléfono:</label>
                <input type="text" className="form-control" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="col-form-label">Tipo de Documento:</label>
                <select className="form-control" value={tipoDocumento} onChange={(e) => setTipoDocumento(e.target.value)} required>
                  <option value="">Seleccione un tipo de documento</option>
                  <option value="1">Nacido Vivo</option>
                  <option value="2">Registro Civil</option>
                  <option value="3">Tarjeta de Identidad</option>
                  <option value="4">Cédula de Ciudadanía</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="col-form-label">Imagen:</label>
                <input type="file" className="form-control" onChange={handleImageUpload} />
              </div>
              <button type="submit" className="btn btn-primary w-100">Registrar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
