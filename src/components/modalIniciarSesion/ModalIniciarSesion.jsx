import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalRegistrarUsuario from '../modalRegistro/ModalRegistrarse';
import './ModalIniciarSesion.css';

export default function IniciarSesionModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailUser: email,
          password_user: password,
        }),
      });

      if (!response.ok) {
        alert("Credenciales incorrectas");
        return;
      }

      const data = await response.json();
      console.log("Respuesta del log: ", data);

      // Guardar usuario y datos personales en localStorage
      localStorage.setItem("usuario", JSON.stringify(data.usuario));
      localStorage.setItem("datosPersonales", JSON.stringify(data.datosPersonales || {}));

      // Redireccionar a la página de usuario
      navigate("/usuario");
    } catch (error) {
      alert("Error al iniciar sesión: " + error.message);
      console.error("Error en login:", error);
    }
  };

  return (
    <>    
      <div className="modal fade" id="iniciarSesion" tabIndex="-1" aria-labelledby="modal" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="titulo-modal-cc">Iniciar sesión</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="emailLogin" className="col-form-label">Correo Electrónico:</label>
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
                  <label htmlFor="passwordLogin" className="col-form-label">Contraseña:</label>
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

                <div className="opcion-registrarse">
                  <p>Si no tienes una cuenta, regístrate 
                    <span data-bs-toggle="modal" data-bs-target="#registrarme" className="opcion-de-registro"> aquí</span>
                  </p>
                </div>

                <button type="submit" className="btn btn-outline-success w-100">Iniciar sesión</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ModalRegistrarUsuario />
    </>
  );
}
