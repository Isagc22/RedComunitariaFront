import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaIdCard, FaHome, FaPhone, FaFileImage } from "react-icons/fa";
import authService from '../../services/authService';
import './ModalRegistrarse.css';

export default function RegistrarmeModal() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [idTipoUsuario] = useState(2);
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [cedula, setCedula] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [imagen, setImagen] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await authService.register(username, password);

      document.getElementById('registrarme').classList.remove('show');
      document.body.classList.remove('modal-open');
      document.getElementsByClassName('modal-backdrop')[0]?.remove();

      const user = authService.getCurrentUser();
      console.log("Usuario registrado:", user);

      navigate("/usuario");
      alert("¡Registro exitoso! Bienvenido a la plataforma.");
    } catch (error) {
      console.error("Error en el registro:", error);
      setError(error.response?.data?.message || "Error al registrar usuario. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
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
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <h5>Datos de Usuario</h5>

              <div className="mb-3">
                <label className="col-form-label">Nombre de Usuario:</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-icon"><FaEnvelope /></span>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Correo Electrónico"
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-icon"><FaLock /></span>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Contraseña"
                />
              </div>

              <div className="mb-3">
                <label className="col-form-label">Confirmar Contraseña:</label>
                <input
                  type="password"
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <h5>Datos Personales (Opcional)</h5>
              <p className="text-muted small">Podrás completar esta información más tarde en tu perfil</p>

              <div className="input-group mb-3">
                <span className="input-icon"><FaUser /></span>
                <input
                  type="text"
                  className="form-control"
                  value={nombreCompleto}
                  onChange={(e) => setNombreCompleto(e.target.value)}
                  placeholder="Nombre Completo"
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-icon"><FaIdCard /></span>
                <input
                  type="text"
                  className="form-control"
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                  placeholder="Cédula"
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-icon"><FaHome /></span>
                <input
                  type="text"
                  className="form-control"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  placeholder="Dirección"
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-icon"><FaPhone /></span>
                <input
                  type="text"
                  className="form-control"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="Teléfono"
                />
              </div>

              <div className="mb-3">
                <label className="col-form-label">Tipo de Documento:</label>
                <select
                  className="form-control"
                  value={tipoDocumento}
                  onChange={(e) => setTipoDocumento(e.target.value)}
                >
                  <option value="">Seleccione un tipo de documento</option>
                  <option value="1">Nacido Vivo</option>
                  <option value="2">Registro Civil</option>
                  <option value="3">Tarjeta de Identidad</option>
                  <option value="4">Cédula de Ciudadanía</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="col-form-label">Imagen (opcional):</label>
                <div className="input-group">
                  <span className="input-icon"><FaFileImage /></span>
                  <input type="file" className="form-control" onChange={handleImageUpload} />
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? 'Registrando...' : 'Registrar'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
