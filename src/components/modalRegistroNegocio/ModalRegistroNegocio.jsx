import React from 'react'

export default function ModalRegistroNegocio() {
    return (
        <>




                <div class="modal fade" id="registrar-mi-negocio" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Registrar Negocio/Emprendimiento</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="mb-3">
                                        <label for="nombreEmprendimiento" class="col-form-label">Nombre Negocio/Emprendimiento:</label>
                                        <input type="text" class="form-control" id="nombreEmprendimiento" required />
                                    </div>
                                    <div class="mb-3">
                                        <label for="descripcion" class="col-form-label">Descripción:</label>
                                        <input type="text" class="form-control" id="descripcion" required />
                                    </div>


                                    <div class="mb-3">
                                        <label for="Tipo" class="col-form-label">Tipo:</label>
                                        <input type="text" class="form-control" id="Tipo" required />
                                    </div>
                                    <div class="mb-3">
                                        <label for="fechaCreacion" class="col-form-label">Fecha de creación:</label>
                                        <input type="date" class="form-control" id="fechaCreacion" required max="2025-12-31" />
                                    </div>
                                    <div class="mb-3">
                                        <label class="col-form-label">Estado:</label>
                                        <div>
                                            <input type="radio" id="negocioActivo" name="estado" value="Activo" required />
                                            <label for="negocioActivo">Activo</label>
                                        </div>
                                        <div>
                                            <input type="radio" id="negocioInactivo" name="estado" value="Inactivo" required />
                                            <label for="negocioInactivo">Inactivo</label>
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <label for="imagenNegocio" class="col-form-label">Imagen:</label>
                                        <input type="file" class="form-control" id="imagenNegocio" />
                                    </div>
                                    <div class="mb-3">
                                        <label for="region" class="col-form-label">Región ubicado:</label>
                                        <input type="text" class="form-control" id="region" required />
                                    </div>

                                    <fieldset>
                                        <div class="mb-3">
                                            <label for="region" class="col-form-label">Región ubicado:</label>
                                            <input type="text" class="form-control" id="region" required />
                                        </div>
                                        <div class="mb-3">
                                            <label for="region" class="col-form-label">Región ubicado:</label>
                                            <input type="text" class="form-control" id="region" required />
                                        </div>

                                        <div class="mb-3">
                                            <label for="fechaCreacion" class="col-form-label">Fecha de creación:</label>
                                            <input type="date" class="form-control" id="fechaCreacion" required max="2025-12-31" />
                                        </div>
                                    </fieldset>

                                    <fieldset>
                                        <div class="mb-3">
                                            <label for="region" class="col-form-label">Región ubicado:</label>
                                            <input type="text" class="form-control" id="region" required />
                                        </div>

                                        <div class="mb-3">
                                            <label for="region" class="col-form-label">Región ubicado:</label>
                                            <input type="text" class="form-control" id="region" required />
                                        </div>

                                        <div class="mb-3">
                                            <label for="region" class="col-form-label">Región ubicado:</label>
                                            <input type="text" class="form-control" id="region" required />
                                        </div>

                                    </fieldset>

                                    <button type="submit" class="btn btn-primary w-100">Registrar Negocio</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}
