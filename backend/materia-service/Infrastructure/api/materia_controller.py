from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from Infrastructure.database.connection import SessionLocal
from Infrastructure.repositories.mysql_materia_repository import MySQLMateriaRepository
from Application.use_cases.create_materia import CreateMateriaUseCase
from Application.use_cases.get_materias import GetMateriasUseCase
from Application.use_cases.update_materia import UpdateMateriaUseCase
from Application.use_cases.delete_materia import DeleteMateriaUseCase
from Infrastructure.api.schemas.materia_schema import MateriaCreateSchema

router = APIRouter(prefix="/materias")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

from Infrastructure.api.schemas.materia_schema import MateriaCreateSchema

@router.post("/")
def create_materia(
    materia: MateriaCreateSchema,
    db: Session = Depends(get_db)
):
    try:
        if materia.carrera == "LIDTS":
            carrera_id = 1
        elif materia.carrera == "LSC":
            carrera_id = 2
        else:
            raise ValueError("Carrera inválida")

        repository = MySQLMateriaRepository(db)
        use_case = CreateMateriaUseCase(repository)

        return use_case.execute(
            nombre=materia.nombre,
            descripcion=materia.descripcion,
            semestre=materia.semestre,
            carrera_id=carrera_id,
            activa=materia.activa
        )

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/")
def get_materias(db: Session = Depends(get_db)):
    repository = MySQLMateriaRepository(db)
    use_case = GetMateriasUseCase(repository)
    return use_case.execute()

@router.put("/{materia_id}")
def update_materia(
    materia_id: int,
    nombre: str,
    carrera_id: int,
    activa: bool = True,
    db: Session = Depends(get_db)
):
    use_case = UpdateMateriaUseCase(db)
    materia = use_case.execute(materia_id, nombre, carrera_id, activa)
    
    if not materia:
        raise HTTPException(status_code=404, detail="Materia no encontrada")
    return materia

@router.delete("/{materia_id}")
def delete_materia(
    materia_id: int,
    db: Session = Depends(get_db)
):
    use_case = DeleteMateriaUseCase(db)
    deleted = use_case.execute(materia_id)

    if not deleted:
        raise HTTPException(status_code=404, detail="Materia no encontrada")

    return {"message: Materia eliminada exitosamente"}
