import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import NavBarUsuario from '../components/navBarUsuario/NavBarUsuario';
import axios from 'axios';

// Registrar componentes necesarios de Chart.js
Chart.register(...registerables);

export default function GraficasDatosEnergia() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [emprendimientos, setEmprendimientos] = useState([]);
  const [emprendimientoSeleccionado, setEmprendimientoSeleccionado] = useState('');
  const [datosConsumo, setDatosConsumo] = useState(null);
  const [datosProduccion, setDatosProduccion] = useState(null);
  const [datosEficiencia, setDatosEficiencia] = useState(null);
  const [filtroTiempo, setFiltroTiempo] = useState('mes');

  // Cargar lista de emprendimientos del usuario
  useEffect(() => {
    const cargarEmprendimientos = async () => {
      try {
        console.log('Cargando emprendimientos en GraficasDatosEnergia...');
        const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
        
        if (!token) {
          console.error('No hay token de autenticación');
          setError("No se pudieron cargar los emprendimientos - Sin autenticación");
          return;
        }
        
        // Configurar el token en las cabeceras
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };
        
        const response = await axios.get('http://localhost:8080/emprendimientos/mis-emprendimientos', config);
        console.log('Emprendimientos cargados:', response.data);
        setEmprendimientos(response.data);
        
        // Seleccionar el primer emprendimiento por defecto
        if (response.data.length > 0) {
          setEmprendimientoSeleccionado(response.data[0].idemprendimiento);
        }
      } catch (err) {
        console.error("Error al cargar emprendimientos:", err);
        setError("No se pudieron cargar los emprendimientos");
      }
    };

    cargarEmprendimientos();
  }, []);

  // Cargar datos cuando cambia el emprendimiento seleccionado o el filtro de tiempo
  useEffect(() => {
    if (!emprendimientoSeleccionado) return;
    
    const cargarDatos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/produccion-consumo/datos/${emprendimientoSeleccionado}`, {
          params: { filtro: filtroTiempo }
        });
        
        // Procesar datos para los gráficos
        procesarDatos(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error al cargar datos de energía:", err);
        setError("No se pudieron cargar los datos de energía");
        
        // Cargar datos de ejemplo para mostrar
        cargarDatosEjemplo();
        setLoading(false);
      }
    };

    cargarDatos();
  }, [emprendimientoSeleccionado, filtroTiempo]);

  // Función para procesar los datos recibidos del backend
  const procesarDatos = (datos) => {
    if (!datos || !datos.fechas || datos.fechas.length === 0) {
      cargarDatosEjemplo();
      return;
    }

    // Datos para gráfico de consumo
    const datosConsumoProcesados = {
      labels: datos.fechas,
      datasets: [
        {
          label: 'Consumo de Energía (kWh)',
          data: datos.energiaConsumida,
          fill: false,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          tension: 0.1
        }
      ]
    };
    
    // Datos para gráfico de producción
    const datosProduccionProcesados = {
      labels: datos.fechas,
      datasets: [
        {
          label: 'Producción de Energía (kWh)',
          data: datos.energiaProducida,
          fill: false,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          tension: 0.1
        }
      ]
    };

    // Datos para gráfico de eficiencia (comparativo)
    const datosEficienciaProcesados = {
      labels: datos.fechas,
      datasets: [
        {
          type: 'bar',
          label: 'Consumo (kWh)',
          data: datos.energiaConsumida,
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
        {
          type: 'bar',
          label: 'Producción (kWh)',
          data: datos.energiaProducida,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }
      ]
    };

    setDatosConsumo(datosConsumoProcesados);
    setDatosProduccion(datosProduccionProcesados);
    setDatosEficiencia(datosEficienciaProcesados);
  };

  // Cargar datos de ejemplo en caso de error o sin datos
  const cargarDatosEjemplo = () => {
    const fechasEjemplo = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
    const consumoEjemplo = [65, 59, 80, 81, 56, 55];
    const produccionEjemplo = [28, 48, 40, 69, 76, 67];

    const datosConsumoEjemplo = {
      labels: fechasEjemplo,
      datasets: [
        {
          label: 'Consumo de Energía (kWh) - Ejemplo',
          data: consumoEjemplo,
          fill: false,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          tension: 0.1
        }
      ]
    };
    
    const datosProduccionEjemplo = {
      labels: fechasEjemplo,
      datasets: [
        {
          label: 'Producción de Energía (kWh) - Ejemplo',
          data: produccionEjemplo,
          fill: false,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          tension: 0.1
        }
      ]
    };

    const datosEficienciaEjemplo = {
      labels: fechasEjemplo,
      datasets: [
        {
          type: 'bar',
          label: 'Consumo (kWh) - Ejemplo',
          data: consumoEjemplo,
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
        {
          type: 'bar',
          label: 'Producción (kWh) - Ejemplo',
          data: produccionEjemplo,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }
      ]
    };

    setDatosConsumo(datosConsumoEjemplo);
    setDatosProduccion(datosProduccionEjemplo);
    setDatosEficiencia(datosEficienciaEjemplo);
  };

  // Opciones para los gráficos
  const optionsLine = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Período'
        }
      },
      y: {
        title: {
          display: true,
          text: 'kWh'
        },
        min: 0,
      }
    },
  };

  const optionsBar = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
      title: {
        display: true,
        text: 'Comparativo de Consumo vs. Producción'
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Período'
        }
      },
      y: {
        title: {
          display: true,
          text: 'kWh'
        },
        min: 0,
      }
    },
  };

  const handleEmprendimientoChange = (e) => {
    setEmprendimientoSeleccionado(e.target.value);
  };

  const handleFiltroChange = (e) => {
    setFiltroTiempo(e.target.value);
  };

  return (
    <>
      <NavBarUsuario />
      <div className="container mt-4">
        <h1 className="text-center mb-4">Estadísticas de Energía</h1>
        
        <div className="row mb-4">
          <div className="col-md-8 mx-auto">
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">Filtros</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="emprendimiento" className="form-label">Emprendimiento</label>
                    <select 
                      className="form-select" 
                      id="emprendimiento" 
                      value={emprendimientoSeleccionado}
                      onChange={handleEmprendimientoChange}
                    >
                      {emprendimientos.length === 0 && (
                        <option value="">No hay emprendimientos disponibles</option>
                      )}
                      {emprendimientos.map(emp => (
                        <option key={emp.idemprendimiento} value={emp.idemprendimiento}>{emp.nombre}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="filtroTiempo" className="form-label">Período</label>
                    <select 
                      className="form-select" 
                      id="filtroTiempo" 
                      value={filtroTiempo}
                      onChange={handleFiltroChange}
                    >
                      <option value="semana">Última semana</option>
                      <option value="mes">Último mes</option>
                      <option value="trimestre">Último trimestre</option>
                      <option value="anio">Último año</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-2">Cargando datos...</p>
          </div>
        ) : (
          <>
            {error && (
              <div className="alert alert-warning">
                <p><strong>Nota:</strong> {error}</p>
                <p>Mostrando datos de ejemplo para visualización.</p>
              </div>
            )}
            
            <div className="row mb-4">
              <div className="col-md-6">
                <div className="card h-100">
                  <div className="card-header bg-info text-white">
                    <h5 className="mb-0">Consumo de Energía</h5>
                  </div>
                  <div className="card-body">
                    {datosConsumo && <Line data={datosConsumo} options={optionsLine} />}
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="card h-100">
                  <div className="card-header bg-success text-white">
                    <h5 className="mb-0">Producción de Energía</h5>
                  </div>
                  <div className="card-body">
                    {datosProduccion && <Line data={datosProduccion} options={optionsLine} />}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-8 mx-auto">
                <div className="card">
                  <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">Comparativo Producción vs. Consumo</h5>
                  </div>
                  <div className="card-body">
                    {datosEficiencia && <Bar data={datosEficiencia} options={optionsBar} />}
                  </div>
                  <div className="card-footer bg-light">
                    <div className="d-flex justify-content-between">
                      <button 
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => window.location.href = '/registro-produccion-consumo'}
                      >
                        Registrar Nuevos Datos
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
} 