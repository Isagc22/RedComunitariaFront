import React from 'react';

export default function ModalActualizarUsuario() {
  return (
    <>
      <div className="modal fade" id="actualizar-info-usuario" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Actualizar información</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="nombreCompleto" className="col-form-label">Nombre Completo:</label>
                  <input type="text" className="form-control" id="nombreCompleto" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="cedula" className="col-form-label">Cédula:</label>
                  <input type="text" className="form-control" id="cedula" readOnly required />
                </div>
                <div className="mb-3">
                  <label htmlFor="tipoDocumento" className="col-form-label">Tipo de Documento:</label>
                  <select className="form-select" id="tipoDocumento" required>
                    <option value="cc" disabled>Cédula de Ciudadanía</option>
                    <option value="ti" disabled>Tarjeta de Identidad</option>
                    <option value="pasaporte" disabled>Pasaporte</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="direccion" className="col-form-label">Dirección:</label>
                  <input type="text" className="form-control" id="direccion" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="telefono" className="col-form-label">Teléfono:</label>
                  <input type="tel" className="form-control" id="telefono" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="imagen" className="col-form-label">Imagen:</label>
                  <input type="file" className="form-control" id="imagen" />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="col-form-label">Correo Electrónico:</label>
                  <input type="email" className="form-control" id="email" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="col-form-label">Contraseña:</label>
                  <input type="password" className="form-control" id="password" readOnly required />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">¿Tienes al menos un negocio?</label>
                  <div>
                    <input type="radio" id="negocioSi" name="negocio" value="si" required />
                    <label htmlFor="negocioSi">Sí</label>
                  </div>
                  <div>
                    <input type="radio" id="negocioNo" name="negocio" value="no" required />
                    <label htmlFor="negocioNo">No</label>
                  </div>
                </div>
                <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" id="terminos" required checked />
                  <label htmlFor="terminos" className="form-check-label">Conozco y acepto los términos y condiciones</label>
                </div>
                <button type="submit" className="btn btn-primary w-100">Registrar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
