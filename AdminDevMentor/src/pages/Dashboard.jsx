import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiTrendingUp, FiClock, FiUserX, FiShield, FiCode } from 'react-icons/fi';

export default function Dashboard() {
  // 1. ESTADOS DE REACT PARA MANEJAR LA API
  const [lenguajes, setLenguajes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  // 2. PETICIÓN PROTEGIDA AL BACKEND
  useEffect(() => {
    const cargarDatosDashboard = async () => {
      try {
        // Obtenemos el "gafete" (Token JWT) que el Login guardó
        const token = localStorage.getItem('adminToken');
        
        // Hacemos la petición adjuntando el Token en los Headers
        const respuestaLenguajes = await axios.get('http://127.0.0.1:8000/lenguajes', {
          headers: {
            'Authorization': `Bearer ${token}` // Así le demostramos al Gateway quiénes somos
          }
        });
        
        setLenguajes(respuestaLenguajes.data);
      } catch (err) {
        console.error("Error conectando con el backend:", err);
        setError('No se pudieron cargar los datos en tiempo real. (Error de autorización)');
      } finally {
        setCargando(false);
      }
    };

    cargarDatosDashboard();
  }, []);

  return (
    <div className="animate-fade-in max-w-7xl mx-auto">
      {/* Encabezado */}
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-on-surface tracking-tight">Panel General</h1>
          <p className="text-on-surface/70 mt-1">
            Bienvenido, Admin. Tienes <span className="font-semibold text-primary">12 tareas</span> pendientes para hoy.
          </p>
        </div>
        <div className="flex bg-surface-high rounded-md p-1">
          <button className="px-4 py-1.5 text-sm font-medium rounded bg-surface-lowest shadow-sm text-on-surface">Hoy</button>
          <button className="px-4 py-1.5 text-sm font-medium rounded text-on-surface/70 hover:text-on-surface">Esta Semana</button>
          <button className="px-4 py-1.5 text-sm font-medium rounded text-on-surface/70 hover:text-on-surface">Mes</button>
        </div>
      </div>

      {/* Alerta de Error de Conexión (Aparece si el token es inválido o el servidor está caído) */}
      {error && (
        <div className="mb-6 p-4 bg-error-container/50 text-on-error rounded-md text-sm font-medium">
          {error}
        </div>
      )}

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Columna Izquierda ocupa 2 espacios */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Tarjetas de Métricas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Tarjeta 1 */}
            <div className="bg-surface-lowest p-6 rounded-md shadow-cloud border-t-4 border-primary">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-bold text-primary tracking-widest bg-primary/10 px-2 py-1 rounded uppercase">Actividad Total</span>
                <FiTrendingUp className="text-primary" size={20} />
              </div>
              <h2 className="text-4xl font-black text-on-surface tracking-tighter">1,248</h2>
              <p className="text-sm text-on-surface/70 mt-2">Asesorías realizadas este ciclo</p>
            </div>

            {/* Tarjeta 2 */}
            <div className="bg-[#fdf4e7] p-6 rounded-md shadow-cloud">
              <div className="flex justify-between items-start mb-4">
                <FiClock className="text-[#995c00]" size={20} />
                <span className="text-[10px] font-bold text-[#995c00] tracking-widest uppercase">Pendientes</span>
              </div>
              <h2 className="text-4xl font-black text-[#995c00] tracking-tighter">24</h2>
              <p className="text-sm text-[#995c00]/80 mt-2">Reportes en espera</p>
            </div>

            {/* Tarjeta 3 */}
            <div className="bg-error-container/40 p-6 rounded-md shadow-cloud">
              <div className="flex justify-between items-start mb-4">
                <FiUserX className="text-on-error" size={20} />
                <span className="text-[10px] font-bold text-on-error tracking-widest uppercase">Suspensiones</span>
              </div>
              <h2 className="text-4xl font-black text-on-error tracking-tighter">08</h2>
              <p className="text-sm text-on-error/80 mt-2">Usuarios suspendidos</p>
            </div>
          </div>

          {/* DATOS DINÁMICOS: Tabla de Lenguajes conectada al Backend */}
          <div className="bg-surface-lowest p-6 rounded-md shadow-cloud mt-2">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-on-surface">Lenguajes de Programación Activos</h3>
              <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">Vía API Gateway</span>
            </div>
            
            {cargando ? (
              <div className="animate-pulse flex flex-col gap-4">
                <div className="h-12 bg-surface-high rounded-md w-full"></div>
                <div className="h-12 bg-surface-high rounded-md w-full"></div>
              </div>
            ) : lenguajes.length > 0 ? (
              <div className="flex flex-col gap-2">
                {lenguajes.map((lenguaje) => (
                  <div key={lenguaje.id} className="flex items-center justify-between p-3 hover:bg-surface-high rounded-md transition-colors border-b border-outline-variant/10 last:border-0">
                    <div className="flex items-center gap-4 w-1/3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                        <FiCode size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-on-surface">{lenguaje.nombre}</p>
                        <p className="text-xs text-on-surface/50 font-mono">ID: {lenguaje.id}</p>
                      </div>
                    </div>
                    <div className="w-1/2 text-sm text-on-surface/80">{lenguaje.descripcion}</div>
                    <div className="w-1/4 text-right">
                      <span className={`text-xs font-bold px-2 py-1 rounded ${lenguaje.activo ? 'text-on-success bg-success-container/50' : 'text-on-error bg-error-container/50'}`}>
                        {lenguaje.activo ? 'ACTIVO' : 'INACTIVO'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-sm text-on-surface/60">
                No hay lenguajes registrados en la base de datos.
              </div>
            )}
          </div>
        </div>

        {/* Columna Derecha (Feed de Actividad) */}
        <div className="flex flex-col gap-6">
          <div className="bg-surface-lowest p-6 rounded-md shadow-cloud">
            <h3 className="text-lg font-bold text-on-surface mb-6">Actividad del Sistema</h3>
            
            <div className="flex flex-col gap-6 relative before:absolute before:top-2 before:bottom-2 before:left-[19px] before:w-0.5 before:bg-outline-variant/30">
              
              <div className="flex gap-4 relative z-10">
                <div className="w-10 h-10 rounded-full bg-surface-lowest border-2 border-primary flex items-center justify-center text-primary flex-shrink-0">
                  <FiShield size={16} />
                </div>
                <div className="pt-2">
                  <p className="text-sm font-bold text-on-surface">Nueva regla de seguridad aplicada</p>
                  <p className="text-xs text-on-surface/70 mt-1">Actualización de tokens JWT</p>
                  <p className="text-[10px] font-bold text-on-surface/40 mt-2 uppercase tracking-wider">Hace 5 min</p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}