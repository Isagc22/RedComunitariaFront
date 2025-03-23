import './VistaNegociosEmprendimientos.css'

import React from 'react'

export default function VistaNegociosEmprendimientos() {
    return (
        <>

            <section className="vista-negocios">
                <div className="contenedor">
                    <h2>Vista listado negocios</h2>
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Descripción</th>
                                <th scope="col">Tipo</th>
                                <th scope="col">Fecha de creación</th>
                                <th scope="col">Estado</th>
                                <th scope="col">Imagen</th>
                                <th scope="col">ubicación</th>
                                <th scope="col">Producción/consumo energía</th>
                                <th scope="col">Historial</th>
                                <th scope="col">Opciones Negocio</th>





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
                                <td>@lorem</td>
                                <td>@lorem</td>
                                <td className='opciones-negocios'>
                                    <div className="leer-negocio"><i class="bi bi-eye"></i></div>
                                    <div className="actualizar-negocio"><i class="bi bi-pencil"></i></div>
                                    <div className="eliminar-negocio"><i class="bi bi-trash"></i></div>


                                </td>


                            </tr>

                        </tbody>
                    </table>
                </div>

            </section>   </>
    )
}
