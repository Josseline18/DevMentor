from fastapi import APIRouter
from pydantic import BaseModel
from app.application.register_user_service import RegisterUserService
from app.application.authenticate_user import AuthenticateUser
from app.application.get_user_service import GetUserService
from app.application.update_user_service import UpdateUserService
from app.adapters.repositories.user_repository_mysql import UserRepositoryMySQL
from app.infrastructure.jose_token_provider import JoseTokenProvider


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


class UpdateUserRequest(BaseModel):
    nombre: str | None = None
    correo: str | None = None
    telefono: str | None = None
    contrasena: str | None = None

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

    use_case = AuthenticateUser(
        user_repository=UserRepositoryMySQL(),
        token_provider=JoseTokenProvider(),
    )

    return use_case.execute(
        data.correo,
        data.contrasena
    )


@router.get("/users/{id_usuario}")
def get_user_by_id(id_usuario: int):

    service = GetUserService()

    return service.execute(id_usuario)


@router.put("/users/{id_usuario}")
def update_user(id_usuario: int, data: UpdateUserRequest):

    service = UpdateUserService()

    return service.execute(
        id_usuario=id_usuario,
        nombre=data.nombre,
        correo=data.correo,
        telefono=data.telefono,
        contrasena=data.contrasena,
    )