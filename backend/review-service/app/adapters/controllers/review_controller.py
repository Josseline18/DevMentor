from datetime import datetime, timezone
from typing import Optional

from fastapi import APIRouter, Query
from pydantic import BaseModel, ConfigDict, Field

from app.application.create_resena_service import CreateResenaService
from app.application.list_resenas_service import ListResenasService

router = APIRouter(prefix="/resenas", tags=["resenas"])


class CreateResenaRequest(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id_usuario: int = Field(gt=0, alias="idUsuario")
    id_asesor: int = Field(gt=0, alias="idAsesor")
    id_materia: int = Field(gt=0, alias="idMateria")
    calificacion: int = Field(ge=1, le=5)
    comentario: str = Field(min_length=3, max_length=2000)


def _format_fecha(fecha_creacion):
    if isinstance(fecha_creacion, datetime):
        if fecha_creacion.tzinfo is None:
            fecha_creacion = fecha_creacion.replace(tzinfo=timezone.utc)
        return fecha_creacion.isoformat()

    if fecha_creacion is None:
        return ""

    return str(fecha_creacion)


def _format_resena(resena):
    return {
        "idResena": resena["id_resena"],
        "idUsuario": resena["id_usuario"],
        "idAsesor": resena["id_asesor"],
        "idMateria": resena["id_materia"],
        "calificacion": resena["calificacion"],
        "comentario": resena["comentario"],
        "fechaCreacion": _format_fecha(resena["fecha_creacion"]),
    }


@router.post("")
def create_resena(data: CreateResenaRequest):
    service = CreateResenaService()

    created = service.execute(
        id_usuario=data.id_usuario,
        id_asesor=data.id_asesor,
        id_materia=data.id_materia,
        calificacion=data.calificacion,
        comentario=data.comentario,
    )

    return {
        "message": "Resena creada correctamente",
        "resena": _format_resena(created),
    }


@router.get("")
def list_resenas(
    id_usuario: Optional[int] = Query(default=None, gt=0, alias="idUsuario"),
    id_asesor: Optional[int] = Query(default=None, gt=0, alias="idAsesor"),
    id_materia: Optional[int] = Query(default=None, gt=0, alias="idMateria"),
):
    service = ListResenasService()
    rows = service.execute(id_usuario=id_usuario, id_asesor=id_asesor, id_materia=id_materia)

    return {
        "resenas": [_format_resena(row) for row in rows],
    }
