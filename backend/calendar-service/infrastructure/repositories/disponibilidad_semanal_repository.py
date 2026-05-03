from sqlalchemy import text
from sqlalchemy.orm import Session
from domain.entities.disponibilidad_semanal import DisponibilidadSemanal

class DisponibilidadSemanalRepository:

    def __init__(self, db: Session):
        self.db = db

    def crear(self, disponibilidad: DisponibilidadSemanal):

        query = text("""
            INSERT INTO disponibilidades 
            (id_perfil, dia_semana, hora_inicio, hora_fin, activo) 
            VALUES (:id_perfil, :dia_semana, :hora_inicio, :hora_fin, :activo)
        """)

        self.db.execute(query, {
            "id_perfil": disponibilidad.id_perfil,
            "dia_semana": disponibilidad.dia_semana,
            "hora_inicio": disponibilidad.hora_inicio,
            "hora_fin": disponibilidad.hora_fin,
            "activo": disponibilidad.activo   # 👈 ESTA LÍNEA FALTABA
        })

        self.db.commit()

        return {"mensaje": "Disponibilidad creada correctamente"}