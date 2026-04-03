from sqlalchemy import Column, Integer, String, Boolean, Text, ForeignKey
from sqlalchemy.orm import relationship
from Infrastructure.database.connection import Base

class Materia(Base):
    __tablename__ = "materias"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    descripcion = Column(Text)
    semestre = Column(Integer, nullable=False)
    carrera_id = Column(Integer, ForeignKey("carreras.id"))
    activa = Column(Boolean, default=True)

    carrera = relationship("Carrera")