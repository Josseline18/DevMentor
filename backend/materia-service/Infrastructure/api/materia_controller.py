from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from Infrastructure.database.connection import SessionLocal
from Infrastructure.repositories.mysql_materia_repository import MySQLMateriaRepository
from Application.use_cases.create_materia import CreateMateriaUseCase
from Application.use_cases.get_materias import GetMateriasUseCase
from Application.use_cases.update_materia import UpdateMateriaUseCase
from Application.use_cases.delete_materia import DeleteMateriaUseCase

router = APIRouter(prefix="/materias")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
def create_materia(
    nombre: str,
    descripcion: str,
    semestre: int,
    carrera_id: int,
    db: Session = Depends(get_db)
):
    try:
        repository = MySQLMateriaRepository(db)
        use_case = CreateMateriaUseCase(repository)
        return use_case.execute(nombre, descripcion, semestre, carrera_id)
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
