import './ModalInfoUsuario.css';
import logoUsuario from '../../assets/usuarioLogo.png';
import RegistrarNegocioModal from '../modalRegistroNegocio/ModalRegistroNegocio';
import ActualizarMiInformacion from '../modalActualizarUsuario/ModalActualizarUsuario'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function ModalInfoUsuario() {
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null); // Para el modal de actualización

  const [datosPersonales, setDatosPersonales] = useState([]);
  const [tipo, setTipo] = useState(""); // Para el modal
  const [nombre, setNombre] = useState(""); // Para el modal
  const [id, setId] = useState(null); // Para el modal
  const [usuarioData, setUsuarioData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Se lee la información del usuario desde el localStorage
    const storedUser = localStorage.getItem('datosPersonales');
    if (storedUser) {
      setUsuarioData(JSON.parse(storedUser));
    }
  }, []);

  const handleCerrarSesion = () => {
    // Elimina la información de la sesión y redirige a la página de login o landing
    localStorage.removeItem('usuario');
    localStorage.removeItem('datosPersonales');

    navigate('/'); // Ajusta la ruta de redirección según tu aplicación
  };
  // Función para abrir el modal
  const abrirModal = (tipoEntidad, nombreEntidad, idEntidad) => {
    setTipo(tipoEntidad);
    setNombre(nombreEntidad);
    setId(idEntidad);
    const usuario = datosPersonales.find(dato => dato.iddatospersonales === idEntidad);
    setUsuarioSeleccionado(usuario);
  };

  return (
    <>
      <div className="modal fade" id="informacionUsuario" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header modal-header-info-usuario">
              <div className="info-personal">
                <div className="contenedor-imagen">
                  <img
                    src={usuarioData?.imagen || logoUsuario}
                    alt="Foto Usuario"
                    width="50"
                    height="50"
                    className="d-inline-block align-text-top imagen-usuario-cc"
                  />


                </div>
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Hola {usuarioData ? usuarioData.nombre_completo : 'Cargando...'}
                </h1>
              </div>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body body-modal-info-usuario">
              {usuarioData ? (
                <div>
                  <p><strong>Nombre:</strong> {usuarioData.nombre_completo}</p>
                  <p><strong>Teléfono:</strong> {usuarioData.telefono}</p>
                  {/* Agrega más campos según necesites */}
                </div>
              ) : (
                <p>Cargando información del usuario...</p>
              )}
            </div>
            <div className="contenedor-btn-cerrar-sesion">
              <button
                type="button"
                className="btn-cerrar-sesion-usuario"
                onClick={handleCerrarSesion}
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </div>
      <RegistrarNegocioModal />
      {/* Modal para actualizar */}
      <ActualizarMiInformacion usuarioSeleccionado={usuarioSeleccionado} />
    </>
  );
}
