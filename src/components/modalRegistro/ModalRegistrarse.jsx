import React from "react";

export default function RegistrarmeModal() {
    return (
        <div class="modal fade" id="registrarme" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Registro</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label for="nombreCompleto" class="col-form-label">Nombre Completo:</label>
                            <input type="text" class="form-control" id="nombreCompleto" required />
                        </div>
                        <div class="mb-3">
                            <label for="cedula" class="col-form-label">Cédula:</label>
                            <input type="text" class="form-control" id="cedula" required />
                        </div>
                        <div class="mb-3">
                            <label for="tipoDocumento" class="col-form-label">Tipo de Documento:</label>
                            <select class="form-select" id="tipoDocumento" required>
                                <option value="cc">Cédula de Ciudadanía</option>
                                <option value="ti">Tarjeta de Identidad</option>
                                <option value="pasaporte">Pasaporte</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="direccion" class="col-form-label">Dirección:</label>
                            <input type="text" class="form-control" id="direccion" required />
                        </div>
                        <div class="mb-3">
                            <label for="telefono" class="col-form-label">Teléfono:</label>
                            <input type="tel" class="form-control" id="telefono" required />
                        </div>
                        <div class="mb-3">
                            <label for="imagen" class="col-form-label">Imagen:</label>
                            <input type="file" class="form-control" id="imagen" />
                        </div>
                        <div class="mb-3">
                            <label for="email" class="col-form-label">Correo Electrónico:</label>
                            <input type="email" class="form-control" id="email" required />
                        </div>
                        <div class="mb-3">
                            <label for="password" class="col-form-label">Contraseña:</label>
                            <input type="password" class="form-control" id="password" required />
                        </div>
                        <div class="mb-3">
                            <label class="col-form-label">¿Tienes al menos un negocio?</label>
                            <div>
                                <input type="radio" id="negocioSi" name="negocio" value="si" required />
                                <label for="negocioSi">Sí</label>
                            </div>
                            <div>
                                <input type="radio" id="negocioNo" name="negocio" value="no" required />
                                <label for="negocioNo">No</label>
                            </div>
                        </div>
                        <div class="mb-3 form-check">
                            <input type="checkbox" class="form-check-input" id="terminos" required checked />
                            <label for="terminos" class="form-check-label">Conozco y acepto los términos y condiciones</label>
                        </div>
                        <button type="submit" class="btn btn-primary w-100">Registrar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    );
}