import React from "react";

export default function IniciarSesionModal() {
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
                        <h1 className="modal-title fs-5 " id="titulo-modal-cc">
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
                        <form>
                            <div className="mb-3">
                                <label htmlFor="email" className="col-form-label">
                                    Correo Electrónico:
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    required
                                    placeholder="Ingresa tu correo electrónico"
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
                                    required
                                    placeholder="Ingresa tu contraseña"
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