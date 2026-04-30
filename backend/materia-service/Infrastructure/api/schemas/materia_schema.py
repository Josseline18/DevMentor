from pydantic import BaseModel

class MateriaCreateSchema(BaseModel):
    nombre: str
    descripcion: str
    semestre: int
    carrera: str   
    activa: bool