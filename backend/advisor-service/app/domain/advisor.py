from sqlalchemy import Column, Integer, String, JSON, Text, ForeignKey, DateTime, func
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class AdvisorProfile(Base):
    __tablename__ = "asesorias"
    
    id_perfil = Column(Integer, primary_key=True, index=True)
    id_usuario_auth = Column(Integer, nullable=False)  # FK a usuarios table en auth_service
    especialidad = Column(String(200), nullable=True)
    area_especialidad = Column(String(200), nullable=True)
    materias = Column(JSON, nullable=True)  # Array de IDs de materias
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    def to_dict(self):
        return {
            "id_perfil": self.id_perfil,
            "id_usuario_auth": self.id_usuario_auth,
            "especialidad": self.especialidad,
            "area_especialidad": self.area_especialidad,
            "materias": self.materias,
            "created_at": str(self.created_at),
            "updated_at": str(self.updated_at)
        }
