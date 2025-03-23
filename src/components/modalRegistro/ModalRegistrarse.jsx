import React from "react";

export default function RegistrarmeModal() {
  const [tipoDocumento, setTipoDocumento] = useState("cc");
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  return ( 
    <div
      className="modal fade"
      id="registrarme"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Registro</h1>
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
                <input type="text" className="form-control" id="cedula" required />
              </div>

              <div className="mb-3">
                <label htmlFor="tipoDocumento" className="col-form-label">Tipo de Documento:</label>
                <select
                  className="form-select"
                  id="tipoDocumento"
                  required
                  value={tipoDocumento}
                  onChange={(e) => setTipoDocumento(e.target.value)}
                >
                  <option value="cc">Cédula de

