import './VistaUsuarios.css';
import ModalEliminar from '../modalEliminar/ModalEliminar';
import ModalActualizarUsuario from '../modalActualizarUsuario/ModalActualizarUsuario';
export default function vistaUsuarios() {
    return (
        <>
            <section className="vista-usuarios">
                <div className="contenedor">
                    <h2>Vista listado usuarios</h2>
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Cedula</th>
                                <th scope="col">Dirección</th>
                                <th scope="col">Imagen</th>

                                <th scope="col">Telefono</th>
                                <th scope="col">Correo electronico</th>
                                <th scope="col">Negocio</th>
                                <th scope="col">Opciones</th>



                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>lorem</td>
                                <td>lorem</td>
                                <td>@lorem</td>
                                <td>@lorem</td>
                                <td>@lorem</td>

                                <td>@lorem</td>
                                <td>@lorem</td>
                                <td className='opciones-usuario'>
                                    <div className="leer"><i class="bi bi-eye"></i></div>
                                    <div className="actualizar" data-bs-toggle="modal" data-bs-target="#actualizar-info-usuario"><i class="bi bi-pencil"></i></div>
                                    <div className="eliminar"  data-bs-toggle="modal" data-bs-target="#eliminar"><i class="bi bi-trash"></i></div>


                                </td>


                            </tr>

                        </tbody>
                    </table>
                </div>
            </section>

            <ModalEliminar/>
            <ModalActualizarUsuario/>
        </>
    )
}
