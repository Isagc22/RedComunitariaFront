import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function IniciarSesionModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Ajusta la URL del endpoint de login según tu configuración
      const response = await fetch("http://localhost:8080/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Se envía el objeto con los campos que espera el backend
        body: JSON.stringify({
          email_user: email,
          password_user: password,
        }),
      });

      if (!response.ok) {
        // Por ejemplo, si las credenciales son incorrectas
        alert("Credenciales incorrectas");
        return;
      }

      // Se obtiene la respuesta del backend
      const data = await response.json();

      // Se guarda la información del usuario (puede usarse para mantener el estado de autenticación)
      localStorage.setItem("usuario", JSON.stringify(data));

      // Redirige a la ruta del usuario
      navigate("/usuario");

    } catch (error) {
      alert("Error al iniciar sesión: " + error.message);
    }
  };

  return (
    <div
      className="modal fade"
      id="iniciarSesion"
      tabIndex="-1"
      aria-labelledby="modal"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="titulo-modal-cc">
              Iniciar sesión
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="emailLogin" className="col-form-label">
                  Correo Electrónico:
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="emailLogin"
                  required
                  placeholder="Ingresa tu correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="passwordLogin" className="col-form-label">
                  Contraseña:
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="passwordLogin"
                  required
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Iniciar sesión
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
