from pydantic import BaseModel

class CitaCreate(BaseModel):
    id_perfil: int
    id_usuario: int
    fecha: str
    hora: str