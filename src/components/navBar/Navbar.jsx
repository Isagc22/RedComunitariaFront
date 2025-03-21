import React from 'react'
import logo from '../../assets/logo.png'
import './Navbar.css'

export default function Header() {
    return (
        <div>
            <nav class="navbar bg-body-tertiary navbar-campo-conecta">
                <div class="container-fluid contenedor-info-nav">
                    <a class="navbar-brand navbar-cc-principal" href="#">
                        <img src={logo} alt="Logo" width="100" height="100" class="d-inline-block align-text-top" />
                        <p className='nombre-campo-conecta'>Campo Conecta</p>
                    </a>
                    <div class="d-flex contenedor-btns-nav" role="search">
                        <button type="button" class=" btn btn-outline-dark btn-iniciar-sesion" data-bs-toggle="modal" data-bs-target="#iniciarSesion" data-bs-whatever="@mdo"><i class="bi bi-person-plus"></i>Iniciar sesion</button>

                        <button type="button" class=" btn btn-outline-dark btn-registrarme" data-bs-toggle="modal" data-bs-target="#registrarme" data-bs-whatever="@mdo"><i class="bi bi-person-plus"></i>Registarme</button>
                    </div>
                </div>
            </nav>




            <div class="modal fade" id="iniciarSesion" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Iniciar sesion</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="mb-3">
                                    <label for="recipient-name" class="col-form-label">Recipient:</label>
                                    <input type="text" class="form-control" id="recipient-name" />
                                </div>
                                <div class="mb-3">
                                    <label for="message-text" class="col-form-label">Message:</label>
                                    <textarea class="form-control" id="message-text"></textarea>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Send message</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="registrarme" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Registro</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="mb-3">
                                    <label for="recipient-name" class="col-form-label">Recipient:</label>
                                    <input type="text" class="form-control" id="recipient-name" />
                                </div>
                                <div class="mb-3">
                                    <label for="message-text" class="col-form-label">Message:</label>
                                    <textarea class="form-control" id="message-text"></textarea>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Send message</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
