import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaIdCard, FaHome, FaPhone, FaFileImage } from "react-icons/fa";
import './ModalRegistrarse.css';

export default function RegistrarmeModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [idTipoUsuario] = useState(2);
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [cedula, setCedula] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [imagen, setImagen] = useState(null);

  const handleImageUpload = (e) => {
    setImagen(e.target.files[0]);
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
            <form>
              <h5>Datos de Usuario</h5>
              <div className="input-group">
                <span className="input-icon"><FaEnvelope /></span>
                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Correo Electrónico" />
              </div>
              <div className="input-group">
                <span className="input-icon"><FaLock /></span>
                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Contraseña" />
              </div>
              
              <h5>Datos Personales</h5>
              <div className="input-group">
                <span className="input-icon"><FaUser /></span>
                <input type="text" className="form-control" value={nombreCompleto} onChange={(e) => setNombreCompleto(e.target.value)} required placeholder="Nombre Completo" />
              </div>
              <div className="input-group">
                <span className="input-icon"><FaIdCard /></span>
                <input type="text" className="form-control" value={cedula} onChange={(e) => setCedula(e.target.value)} required placeholder="Cédula" />
              </div>
              <div className="input-group">
                <span className="input-icon"><FaHome /></span>
                <input type="text" className="form-control" value={direccion} onChange={(e) => setDireccion(e.target.value)} required placeholder="Dirección" />
              </div>
              <div className="input-group">
                <span className="input-icon"><FaPhone /></span>
                <input type="text" className="form-control" value={telefono} onChange={(e) => setTelefono(e.target.value)} required placeholder="Teléfono" />
              </div>
              <div className="input-group">
                <select className="form-control" value={tipoDocumento} onChange={(e) => setTipoDocumento(e.target.value)} required>
                  <option value="">Seleccione un tipo de documento</option>
                  <option value="1">Nacido Vivo</option>
                  <option value="2">Registro Civil</option>
                  <option value="3">Tarjeta de Identidad</option>
                  <option value="4">Cédula de Ciudadanía</option>
                </select>
              </div>
              <div className="input-group">
                <span className="input-icon"><FaFileImage /></span>
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
