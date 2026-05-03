from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from infrastructure.database.connection import get_db
from infrastructure.repositories.disponibilidad_semanal_repository import DisponibilidadSemanalRepository
from application.use_cases.crear_disponibilidad_semanal import CrearDisponibilidadSemanal
from infrastructure.api.schemas import DisponibilidadSemanalCreate

router = APIRouter(prefix="/calendario", tags=["Calendario"])

@router.post("/disponibilidad")
def crear_disponibilidad_semanal(
    data: DisponibilidadSemanalCreate,
    db: Session = Depends(get_db)
):
    repo = DisponibilidadSemanalRepository(db)
    use_case = CrearDisponibilidadSemanal(repo)

    use_case.ejecutar(data)

    return {"mensaje": "Disponibilidad semanal creada"}