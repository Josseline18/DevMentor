import React from 'react';
import { FiStar, FiAlertCircle, FiTrash2 } from 'react-icons/fi';

export default function Resenas() {
  // Mock data simulando el microservicio de reseñas
  const resenasMock = [
    { id: 101, asesor: 'Dra. Elena Rodríguez', materia: 'Compiladores', calificacion: 5, comentario: 'Excelente asesoría, me ayudó a entender el análisis léxico a la perfección.', fecha: 'Hace 2 horas', reportada: false },
    { id: 102, asesor: 'Ing. Luis Gutierrez', materia: 'Taller de Desarrollo 4', calificacion: 1, comentario: 'El asesor nunca se presentó a la sesión programada.', fecha: 'Hace 1 día', reportada: true },
    { id: 103, asesor: 'Mtra. Nuria Gonzalez', materia: 'Bases de Datos', calificacion: 4, comentario: 'Muy buena explicación sobre normalización, aunque la sesión empezó un poco tarde.', fecha: 'Hace 3 días', reportada: false },
  ];

  return (
    <div className="animate-fade-in max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-on-surface tracking-tight">Moderación de Reseñas</h1>
        <p className="text-on-surface/70 mt-2">Monitoreo del feedback de los estudiantes y gestión de comentarios reportados.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resenasMock.map((resena) => (
          <div key={resena.id} className={`bg-surface-lowest p-6 rounded-md shadow-cloud border-t-4 relative flex flex-col ${resena.reportada ? 'border-on-error' : 'border-outline-variant/30'}`}>
            
            {resena.reportada && (
              <div className="absolute -top-3 -right-3 bg-on-error text-white p-1.5 rounded-full shadow-sm" title="Reseña Reportada">
                <FiAlertCircle size={16} />
              </div>
            )}

            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-xs font-bold text-primary tracking-widest uppercase">{resena.materia}</p>
                <p className="text-sm font-medium text-on-surface mt-1">Para: {resena.asesor}</p>
              </div>
              <div className="flex gap-1 text-[#995c00]">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} fill={i < resena.calificacion ? 'currentColor' : 'none'} size={14} />
                ))}
              </div>
            </div>

            <p className="text-sm text-on-surface/80 italic flex-1 mb-4">"{resena.comentario}"</p>
            
            <div className="flex justify-between items-center pt-4 border-t border-outline-variant/20 mt-auto">
              <span className="text-xs text-on-surface/50 font-mono">{resena.fecha}</span>
              <button className="text-on-error hover:bg-error-container/50 p-2 rounded transition-colors" title="Eliminar reseña">
                <FiTrash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}