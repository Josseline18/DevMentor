import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { NuevaMateriaModal } from '../components/ui/NuevaMateriaModal';

export default function Configuracion() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('catalogo'); // 'catalogo' o 'moderacion'

  // Datos de prueba simulando lo que vendrá del backend
  const materiasOficiales = [
    { id: '001', nombre: 'Taller de Desarrollo 4', carrera: 'Ingeniería en Desarrollo de Software', estado: 'Activa' },
    { id: '002', nombre: 'Cálculo Integral', carrera: 'Ciencias Exactas', estado: 'Activa' },
    { id: '003', nombre: 'Ética Profesional', carrera: 'Humanidades', estado: 'Inactiva' },
  ];

  return (
    <div className="animate-fade-in max-w-7xl mx-auto">
      
      {/* Encabezado Principal */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-on-surface tracking-tight">Configuración del Sistema</h1>
        <p className="text-on-surface/70 mt-2">
          Administración de catálogos, reglas de moderación y parámetros globales.
        </p>
      </div>

      {/* Pestañas (Tabs) */}
      <div className="flex gap-6 border-b border-outline-variant/20 mb-8">
        <button 
          onClick={() => setActiveTab('catalogo')}
          className={`pb-3 text-sm font-bold transition-all ${
            activeTab === 'catalogo' 
              ? 'text-primary border-b-2 border-primary' 
              : 'text-on-surface/50 hover:text-on-surface'
          }`}
        >
          Catálogo Académico
        </button>
        <button 
          onClick={() => setActiveTab('moderacion')}
          className={`pb-3 text-sm font-bold transition-all ${
            activeTab === 'moderacion' 
              ? 'text-primary border-b-2 border-primary' 
              : 'text-on-surface/50 hover:text-on-surface'
          }`}
        >
          Moderación Automática
        </button>
      </div>

      {/* Contenido de la pestaña actual */}
      {activeTab === 'catalogo' && (
        <div className="bg-surface-lowest p-8 rounded-md shadow-cloud">
          
          {/* Cabecera de la tabla */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-on-surface">Materias Oficiales</h2>
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              + Agregar Materia
            </Button>
          </div>

          {/* Tabla */}
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-high/50 text-xs text-on-surface/60 uppercase tracking-wider">
                  <th className="p-4 font-bold rounded-tl-md">ID</th>
                  <th className="p-4 font-bold">NOMBRE DE LA MATERIA</th>
                  <th className="p-4 font-bold">CARRERA</th>
                  <th className="p-4 font-bold">ESTADO</th>
                  <th className="p-4 font-bold text-right rounded-tr-md">ACCIONES</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {materiasOficiales.map((materia, index) => (
                  <tr key={index} className="border-b border-outline-variant/10 hover:bg-surface-high/20 transition-colors">
                    <td className="p-4 text-on-surface/60">{materia.id}</td>
                    <td className="p-4 font-bold text-on-surface">{materia.nombre}</td>
                    <td className="p-4 text-on-surface/80">{materia.carrera}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        materia.estado === 'Activa' 
                          ? 'bg-success-container/30 text-on-success' 
                          : 'bg-outline-variant/20 text-on-surface/60'
                      }`}>
                        {materia.estado}
                      </span>
                    </td>
                    <td className="p-4 text-right flex flex-col gap-1 items-end">
                      <button className="text-primary hover:underline font-medium text-sm">Editar</button>
                      <button className="text-primary hover:underline font-medium text-sm">
                        {materia.estado === 'Activa' ? 'Desactivar' : 'Activar'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Renderizado del Modal */}
      <NuevaMateriaModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

    </div>
  );
}