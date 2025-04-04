import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBarUsuario from '../components/navBarUsuario/NavBarUsuario';
import axios from 'axios';

export default function RegistroProduccionConsumo() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [emprendimientos, setEmprendimientos] = useState([]);
  const [formData, setFormData] = useState({
    emprendimientoId: '',
    fecha: '',
    energiaProducida: '',
    energiaConsumida: '',
    fuenteEnergia: 'Solar',
    observaciones: ''
  });

  // Cargar emprendimientos del usuario
  useEffect(() => {
    const obtenerEmprendimientos = async () => {
      try {
        console.log('Cargando emprendimientos...');
        const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
        
        if (!token) {
          console.error('No hay token de autenticación');
          return;
        }
        
        // Configurar el token en las cabeceras
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };
        
        const response = await axios.get('http://localhost:8080/emprendimientos/mis-emprendimientos', config);
        console.log('Respuesta de emprendimientos:', response.data);
        
        setEmprendimientos(response.data);
        
        // Si hay al menos un emprendimiento, seleccionarlo por defecto
        if (response.data && response.data.length > 0) {
          setFormData(prev => ({
            ...prev,
            emprendimientoId: response.data[0].idemprendimiento
          }));
        } else {
          console.log('No se encontraron emprendimientos');
        }
      } catch (error) {
        console.error('Error al cargar emprendimientos:', error);
        setMessage({
          type: 'warning',
          text: 'No se pudieron cargar los emprendimientos. Por favor, intente de nuevo.'
        });
      }
    };

    obtenerEmprendimientos();
  }, []);

  // Establecer fecha actual por defecto
  useEffect(() => {
    const hoy = new Date().toISOString().split('T')[0];
    setFormData(prev => ({
      ...prev,
      fecha: hoy
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Validación básica
    if (!formData.emprendimientoId || !formData.fecha || !formData.energiaProducida || !formData.energiaConsumida) {
      setMessage({
        type: 'danger',
        text: 'Por favor complete todos los campos obligatorios.'
      });
      setLoading(false);
      return;
    }

    try {
      console.log('Enviando datos de producción/consumo:', formData);
      
      // Convertir valores numéricos
      const datosProcesados = {
        ...formData,
        energiaProducida: parseFloat(formData.energiaProducida),
        energiaConsumida: parseFloat(formData.energiaConsumida)
      };

      const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
      
      if (!token) {
        console.error('No hay token de autenticación');
        setMessage({
          type: 'danger',
          text: 'Error de autenticación. Por favor, inicia sesión nuevamente.'
        });
        setLoading(false);
        return;
      }
      
      // Configurar el token en las cabeceras
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      const response = await axios.post('http://localhost:8080/api/produccion-consumo/registrar', datosProcesados, config);
      console.log('Respuesta del servidor:', response.data);
      
      setMessage({
        type: 'success',
        text: 'Datos de producción y consumo registrados correctamente.'
      });

      // Resetear formulario
      setFormData(prev => ({
        ...prev,
        energiaProducida: '',
        energiaConsumida: '',
        observaciones: ''
      }));

      // Redirigir a gráficas después de 2 segundos
      setTimeout(() => {
        navigate('/estadisticas-energia');
      }, 2000);
    } catch (error) {
      console.error('Error al registrar datos:', error);
      if (error.response) {
        console.error('Respuesta del servidor:', error.response.data);
      }
      setMessage({
        type: 'danger',
        text: 'Error al registrar datos: ' + (error.response?.data?.mensaje || error.message)
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBarUsuario />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <div className="card shadow">
              <div className="card-header bg-primary text-white">
                <h4 className="mb-0">Registro de Producción y Consumo de Energía</h4>
              </div>
              
              <div className="card-body">
                {message && (
                  <div className={`alert alert-${message.type} alert-dismissible fade show`} role="alert">
                    {message.text}
                    <button type="button" className="btn-close" onClick={() => setMessage(null)}></button>
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="emprendimientoId" className="form-label">Emprendimiento</label>
                    <select 
                      className="form-select" 
                      id="emprendimientoId" 
                      name="emprendimientoId" 
                      value={formData.emprendimientoId}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Seleccione un emprendimiento</option>
                      {emprendimientos && emprendimientos.length > 0 ? (
                        emprendimientos.map(emp => (
                          <option key={emp.idemprendimiento} value={emp.idemprendimiento}>
                            {emp.nombre}
                          </option>
                        ))
                      ) : (
                        <option value="" disabled>No hay emprendimientos disponibles</option>
                      )}
                    </select>
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="fecha" className="form-label">Fecha</label>
                    <input 
                      type="date" 
                      className="form-control" 
                      id="fecha" 
                      name="fecha" 
                      value={formData.fecha}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="energiaProducida" className="form-label">Energía Producida (kWh)</label>
                      <input 
                        type="number" 
                        step="0.01"
                        min="0"
                        className="form-control" 
                        id="energiaProducida" 
                        name="energiaProducida" 
                        value={formData.energiaProducida}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="col-md-6 mb-3">
                      <label htmlFor="energiaConsumida" className="form-label">Energía Consumida (kWh)</label>
                      <input 
                        type="number" 
                        step="0.01"
                        min="0"
                        className="form-control" 
                        id="energiaConsumida" 
                        name="energiaConsumida" 
                        value={formData.energiaConsumida}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="fuenteEnergia" className="form-label">Fuente de Energía</label>
                    <select 
                      className="form-select" 
                      id="fuenteEnergia" 
                      name="fuenteEnergia" 
                      value={formData.fuenteEnergia}
                      onChange={handleChange}
                    >
                      <option value="Solar">Solar</option>
                      <option value="Eólica">Eólica</option>
                      <option value="Hidráulica">Hidráulica</option>
                      <option value="Biomasa">Biomasa</option>
                      <option value="Red eléctrica">Red eléctrica</option>
                      <option value="Otra">Otra</option>
                    </select>
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="observaciones" className="form-label">Observaciones</label>
                    <textarea 
                      className="form-control" 
                      id="observaciones" 
                      name="observaciones" 
                      rows="3"
                      value={formData.observaciones}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  
                  <div className="d-grid gap-2">
                    <button 
                      type="submit" 
                      className="btn btn-primary" 
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Registrando...
                        </>
                      ) : 'Registrar Datos'}
                    </button>
                  </div>
                </form>
              </div>
              
              <div className="card-footer bg-light">
                <div className="d-flex justify-content-between align-items-center">
                  <small>Los datos registrados se utilizarán para analizar la eficiencia energética.</small>
                  <button 
                    className="btn btn-outline-secondary btn-sm" 
                    onClick={() => navigate('/estadisticas-energia')}
                  >
                    Ver Estadísticas
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 