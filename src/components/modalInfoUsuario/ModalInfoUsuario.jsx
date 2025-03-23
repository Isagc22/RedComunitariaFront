import './ModalInfoUsuario.css';
import logoUsuario from '../../assets/usuarioLogo.png'
import RegistrarNegocioModal from '../modalRegistroNegocio/ModalRegistroNegocio'

export default function ModalInfoUsuario() {
    let nombreUsuario  = 'Isabela'
    return (
        <>      <div class="modal fade" id="informacionUsuario" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header modal-header-info-usuario">
                        <div className="info-personal">

                            <div className="contenedor-imagen">                    <img
                                src={logoUsuario}
                                alt="Logo"
                                width="50"
                                height="50"
                                className="d-inline-block align-text-top imagen-usuario-cc"
                            /></div>
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Hola {nombreUsuario}</h1>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                    </div>
                    <div class="modal-body body-modal-info-usuario">
                        <div className="perfil-usuario"><i class="bi bi-person-circle"></i> <p>Ver perfil</p></div>
                        <div className="registrar-negocios-usuario" data-bs-toggle="modal" data-bs-target="#registrar-mi-negocio"> <i class="bi bi-shop"></i> <p>Registrar mi negocio</p></div>
                        <div className="contenedor-btn-cerrar-sesion">
                            <button type="button" class="btn-cerrar-sesion-usuario">Cerrar sesion</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

            <RegistrarNegocioModal />
        </>
    )
}
