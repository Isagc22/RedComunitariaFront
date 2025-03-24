import './ModalInfoUsuario.css';
import logoUsuario from '../../assets/usuarioLogo.png';
import RegistrarNegocioModal from '../modalRegistroNegocio/ModalRegistroNegocio';
import { useEffect, useState } from 'react';

export default function ModalInfoUsuario({ userId }) { // Se pasa el ID del usuario seleccionado como prop
    const [usuarioData, setUsuarioData] = useState(null);

    useEffect(() => {
        // Función para obtener datos del backend
        async function fetchUsuarioData() {
            try {
                const response = await fetch(`http://tu-backend-api.com/usuarios/${userId}`); // Cambiar URL según tu API
                const data = await response.json();
                setUsuarioData(data); // Guardar los datos obtenidos en el estado
            } catch (error) {
                console.error('Error al obtener información del usuario:', error);
            }
        }
        if (userId) {
            fetchUsuarioData(); // Solo obtener datos si hay un userId válido
        }
    }, [userId]);

    return (
        <>
            <div className="modal fade" id="informacionUsuario" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header modal-header-info-usuario">
                            <div className="info-personal">
                                <div className="contenedor-imagen">
                                    <img
                                        src={logoUsuario}
                                        alt="Logo"
                                        width="50"
                                        height="50"
                                        className="d-inline-block align-text-top imagen-usuario-cc"
                                    />
                                </div>
                                <h1 className="modal-title fs-5" id="exampleModalLabel">
                                    Hola {usuarioData ? usuarioData.nombre : 'Cargando...'}
                                </h1>
                            </div>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body body-modal-info-usuario">
                            {usuarioData ? (
                                <div>
                                    <p><strong>Nombre:</strong> {usuarioData.nombre}</p>
                                    <p><strong>Email:</strong> {usuarioData.email}</p>
                                    <p><strong>Teléfono:</strong> {usuarioData.telefono}</p>
                                    {/* Agrega más campos según necesites */}
                                </div>
                            ) : (
                                <p>Cargando información del usuario...</p>
                            )}
                        </div>
                        <div className="contenedor-btn-cerrar-sesion">
                            <button type="button" className="btn-cerrar-sesion-usuario">Cerrar sesión</button>
                        </div>
                    </div>
                </div>
            </div>
            <RegistrarNegocioModal />
        </>
    );
}