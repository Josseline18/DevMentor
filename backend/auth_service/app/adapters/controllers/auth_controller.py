from fastapi import APIRouter
from pydantic import BaseModel
from app.application.register_user_service import RegisterUserService

router = APIRouter()

class RegisterRequest(BaseModel):
    nombre: str
    correo: str
    telefono: str
    contrasena: str
    rol: str


@router.post("/auth/register")
def register_user(data: RegisterRequest):

    service = RegisterUserService()

    return service.execute(
        data.nombre,
        data.correo,
        data.telefono,
        data.contrasena,
        data.rol
    )