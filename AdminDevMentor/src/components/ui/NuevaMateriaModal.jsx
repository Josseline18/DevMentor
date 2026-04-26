import React, { useState } from 'react';
import { Button } from './Button';
import { Input } from './Input';
import { FiX } from 'react-icons/fi';

export const NuevaMateriaModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    clave: '',
    nombre: '',
    carrera: 'Ingeniería en Desarrollo y Tecnologías de Software',
    creditos: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí luego enviaremos los datos a tu backend de FastAPI (materia-service)
    console.log("Registrando materia:", formData);
    alert("Materia registrada correctamente (Simulación)");
    onClose(); // Cerramos el modal después de guardar
  };

  return (
    // Backdrop con Glassmorphism
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-on-surface/20 backdrop-blur-sm animate-fade-in">
      
      {/* Contenedor del Modal */}
      <div className="bg-surface-lowest w-full max-w-lg rounded-md shadow-cloud relative">
        
        {/* Encabezado */}
        <div className="flex justify-between items-start p-6 border-b border-outline-variant/20">
          <div>
            <h2 className="text-xl font-bold text-on-surface">Nueva Materia</h2>
            <p className="text-sm text-on-surface/70 mt-1">Defina los parámetros institucionales para el catálogo.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded hover:bg-surface-high text-on-surface/70 hover:text-on-surface transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Cuerpo del Formulario */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
          
          <Input 
            id="clave"
            label="CLAVE DE MATERIA"
            placeholder="Ej. SO-000"
            value={formData.clave}
            onChange={(e) => setFormData({...formData, clave: e.target.value})}
          />
          
          <Input 
            id="nombre"
            label="NOMBRE OFICIAL"
            placeholder="Ej. Computación Distribuida y Redes"
            required
            value={formData.nombre}
            onChange={(e) => setFormData({...formData, nombre: e.target.value})}
          />
          
          {/* Selector de Carrera (Estilo adaptado al diseño de tus inputs) */}
          <div className="flex flex-col w-full">
            <label className="text-xs font-semibold text-on-surface uppercase tracking-wider mb-2">
              FACULTAD / CARRERA
            </label>
            <select 
              className="w-full px-4 py-3 rounded-t-md outline-none transition-all duration-300 bg-surface-high border-b-2 border-outline-variant text-on-surface focus:border-primary focus:bg-surface-lowest shadow-sm appearance-none"
              value={formData.carrera}
              onChange={(e) => setFormData({...formData, carrera: e.target.value})}
            >
              <option value="Ingeniería en Desarrollo y Tecnologías de Software">Ingeniería en Desarrollo y Tecnologías de Software</option>
              <option value="Ciencias Exactas">Ciencias Exactas</option>
              <option value="Humanidades">Humanidades</option>
            </select>
          </div>

          <Input 
            id="creditos"
            label="CRÉDITOS ACADÉMICOS *"
            type="number"
            placeholder="0.0"
            step="0.1"
            value={formData.creditos}
            onChange={(e) => setFormData({...formData, creditos: e.target.value})}
          />

          {/* Pie de Acciones */}
          <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-outline-variant/20">
            <Button type="button" variant="tertiary" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              Registrar Materia
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};