from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from infrastructure.database.connection import get_db
from infrastructure.repositories.cita_repository_impl import CitaRepositoryImpl
from application.use_cases.crear_cita import CrearCitaUseCase
from infrastructure.api.schemas import CitaCreate

router = APIRouter(prefix="/calendario", tags=["Calendario"])

@router.post("/citas")
def crear_cita(data: CitaCreate, db: Session = Depends(get_db)):

    repository = CitaRepositoryImpl(db)
    use_case = CrearCitaUseCase(repository)

    return use_case.ejecutar(
        data.id_perfil,
        data.id_usuario,
        data.fecha,
        data.hora
    )