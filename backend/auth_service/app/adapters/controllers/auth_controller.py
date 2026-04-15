from fastapi import APIRouter
from pydantic import BaseModel
from app.application.register_user_service import RegisterUserService
from app.application.login_user_service import LoginUserService
from app.application.get_user_service import GetUserService


router = APIRouter(prefix="/auth")

class RegisterRequest(BaseModel):
    nombre: str
    correo: str
    telefono: str
    contrasena: str
    rol: str

class LoginRequest(BaseModel):
    correo: str
    contrasena: str

@router.post("/register")
def register_user(data: RegisterRequest):

    service = RegisterUserService()

    return service.execute(
        data.nombre,
        data.correo,
        data.telefono,
        data.contrasena,
        data.rol
    )

@router.post("/login")
def login(data: LoginRequest):

    service = LoginUserService()

    return service.execute(
        data.correo,
        data.contrasena
    )


@router.get("/users/{id_usuario}")
def get_user_by_id(id_usuario: int):

    service = GetUserService()

    return service.execute(id_usuario)