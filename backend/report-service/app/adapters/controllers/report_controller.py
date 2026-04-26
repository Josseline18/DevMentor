from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.infrastructure.database import SessionLocal
from app.domain.report import Report

router = APIRouter(prefix="/reportes")

def get_db():
    db = SessionLocal()
    try: yield db
    finally: db.close()

class CreateReportRequest(BaseModel):
    tipo_entidad: str
    id_entidad: int = None
    motivo: str
    prioridad: str = "Media"

@router.post("/")
def create_report(data: CreateReportRequest, db: Session = Depends(get_db)):
    # Aquí deberías extraer el id_usuario_reporta del token JWT en el futuro
    nuevo_reporte = Report(
        id_usuario_reporta=1, # Hardcodeado temporalmente
        tipo_entidad=data.tipo_entidad,
        id_entidad=data.id_entidad,
        motivo=data.motivo,
        prioridad=data.prioridad
    )
    db.add(nuevo_reporte)
    db.commit()
    db.refresh(nuevo_reporte)
    return nuevo_reporte.to_dict()

@router.get("/")
def get_reports(db: Session = Depends(get_db)):
    reportes = db.query(Report).all()
    return [r.to_dict() for r in reportes]