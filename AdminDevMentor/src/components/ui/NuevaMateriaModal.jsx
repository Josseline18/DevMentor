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
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      semestre: parseInt(formData.semestre),
      carrera: formData.carrera,
      activa: formData.estado === "activo"
    };

    try {
      const response = await fetch("http://localhost:8002/materias/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToSend)
      });

      if (!response.ok) {
        throw new Error("Error al guardar la materia");
      }

      setMensaje("Materia registrada exitosamente");
      setTipoMensaje("success");

      setFormData({
        nombre: '',
        descripcion: '',
        semestre: '',
        carrera: ' ',
        estado: 'activo'
      });

      setTimeout(() => {
        setMensaje("");
        onClose();
      }, 1500);

    } catch (error) {
      setMensaje("Error al registrar la materia");
      setTipoMensaje("error");
      console.error("Error:", error);
    }
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

          {/* Carrera */}
          <div className="flex flex-col w-full">
            <label className="text-xs font-semibold text-on-surface uppercase tracking-wider mb-2">
              CARRERA
            </label>
            <select
              className="w-full px-4 py-3 rounded-t-md outline-none transition-all duration-300 bg-surface-high border-b-2 border-outline-variant text-on-surface focus:border-primary focus:bg-surface-lowest shadow-sm appearance-none"
              value={formData.carrera}
              onChange={(e) => setFormData({ ...formData, carrera: e.target.value })}
              required
            >
              <option value="">Selecciona una opción</option>
              <option value="LIDTS">LIDTS</option>
              <option value="LSC">LSC</option>
            </select>
          </div>

          {/*Nombre de la carrera */}
          <Input
            id="nombre"
            label="MATERIA"
            placeholder="Ej. Taller de Desarrollo IV"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            required
          />

          {/* Descripción */}
          <Input
            id="descripcion"
            label="DESCRIPCIÓN (Máx. 10 palabras)"
            placeholder="Ej. Desarrollo de aplicaciones web modernas"
            value={formData.descripcion}
            onChange={(e) => {
              const palabras = e.target.value.trim().split(/\s+/);
              if (palabras.length <= 10) {
                setFormData({ ...formData, descripcion: e.target.value });
              }
            }}
          />

          {/* Semestre */}
          <div className="flex flex-col w-full">
            <label className="text-xs font-semibold text-on-surface uppercase tracking-wider mb-2">
              SEMESTRE
            </label>
            <select
              className="w-full px-4 py-3 rounded-t-md outline-none transition-all duration-300 bg-surface-high border-b-2 border-outline-variant text-on-surface focus:border-primary focus:bg-surface-lowest shadow-sm appearance-none"
              value={formData.semestre}
              onChange={(e) => setFormData({ ...formData, semestre: e.target.value })}
              required
            >
              <option value="">Selecciona semestre</option>
              {[1,2,3,4,5,6,7,8,9].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          {/* Estado */}
          <div className="flex flex-col w-full">
            <label className="text-xs font-semibold text-on-surface uppercase tracking-wider mb-2">
              ESTADO
            </label>
            <div className="flex gap-6 items-center">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="estado"
                  value="activo"
                  checked={formData.estado === "activo"}
                  onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                />
                Activo
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="estado"
                  value="inactivo"
                  checked={formData.estado === "inactivo"}
                  onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                />
                Inactivo
              </label>
            </div>
          </div>

          {/* Botones */}
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