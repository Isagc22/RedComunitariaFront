import logoUsuario from '../../assets/usuarioLogo.png'

export default function ModalInfoUsuario() {
    return (
        <>      <div class="modal fade" id="informacionUsuario" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header modal-header-info-usuario">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Hola</h1>
                        <div className="contenedor-imagen">                    <img
                        src={logoUsuario}
                        alt="Logo"
                        width="50"
                        height="50"
                        className="d-inline-block align-text-top imagen-usuario-cc"
                    /></div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                    </div>
                    <div class="modal-body">

                    </div>
                </div>
            </div>
        </div> </>
    )
}
