import os
from datetime import time
from typing import List, Optional

from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from jose import JWTError, jwt
from pydantic import BaseModel, ConfigDict, Field
import requests
import httpx

app = FastAPI()

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, especifica los orígenes permitidos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

AUTH_SERVICE_URL = os.getenv("AUTH_SERVICE_URL", "http://localhost:8001")
MATERIA_SERVICE_URL = os.getenv("MATERIA_SERVICE_URL", "http://localhost:8002")
ADVISOR_SERVICE_URL = os.getenv("ADVISOR_SERVICE_URL", "http://localhost:8003")
REVIEW_SERVICE_URL = os.getenv("REVIEW_SERVICE_URL", "http://localhost:8004")
CONTENT_SERVICE_URL = os.getenv("CONTENT_SERVICE_URL", "http://localhost:8005")
REPORT_SERVICE_URL = os.getenv("REPORT_SERVICE_URL", "http://localhost:8006")
CALENDAR_SERVICE_URL = os.getenv("CALENDAR_SERVICE_URL", "http://localhost:8007")
QR_SERVICE_URL = os.getenv("QR_SERVICE_URL", "http://localhost:8008")

JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY") or os.getenv(
    "JWT_SECRET",
    "change-this-secret",
)
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")

PUBLIC_ROUTES = {
    ("POST", "/auth/login"),
    ("POST", "/auth/register"),
}

PUBLIC_PATH_PREFIXES = {
    "/docs",
    "/redoc",
    "/openapi.json",
}


class LoginRequest(BaseModel):
    correo: str
    contrasena: str

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "correo": "admin1@unach.mx",
                    "contrasena": "12345",
                }
            ]
        }
    }


class RegisterRequest(BaseModel):
    nombre: str
    correo: str
    telefono: str
    contrasena: str
    rol: str

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "nombre": "Admin Principal",
                    "correo": "admin1@unach.mx",
                    "telefono": "9610000001",
                    "contrasena": "12345",
                    "rol": "Administrador",
                }
            ]
        }
    }


class UpdateUserRequest(BaseModel):
    nombre: Optional[str] = None
    correo: Optional[str] = None
    telefono: Optional[str] = None
    contrasena: Optional[str] = None
    foto_perfil: Optional[str] = None

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "nombre": "Admin Actualizado",
                    "telefono": "9610000099",
                    "foto_perfil": "data:image/png;base64,iVBORw0KGgoAAA...",
                }
            ]
        }
    }


class UpdateStatusRequest(BaseModel):
    estado: str

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "estado": "Activo",
                }
            ]
        }
    }


class CreateAdvisorRequest(BaseModel):
    id_usuario_auth: int
    especialidad: str
    area_especialidad: str
    materias: Optional[List[int]] = None

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "id_usuario_auth": 3,
                    "especialidad": "Programacion",
                    "area_especialidad": "Backend",
                    "materias": [1, 2, 3],
                }
            ]
        }
    }


class UpdateAdvisorRequest(BaseModel):
    especialidad: Optional[str] = None
    area_especialidad: Optional[str] = None
    materias: Optional[List[int]] = None
    aprobado: Optional[bool] = None
    estado_aprobacion: Optional[str] = None

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "aprobado": True,
                    "estado_aprobacion": "Aprobado",
                }
            ]
        }
    }


class CreateResenaRequest(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id_usuario: int = Field(gt=0, alias="idUsuario")
    id_usuario_auth: int = Field(gt=0, alias="idUsuarioAuth")
    id_materia: int = Field(gt=0, alias="idMateria")
    calificacion: int = Field(ge=1, le=5)
    comentario: str = Field(min_length=3, max_length=2000)

    model_config = ConfigDict(
        populate_by_name=True,
        json_schema_extra={
            "examples": [
                {
                    "idUsuario": 5,
                    "idUsuarioAuth": 3,
                    "idMateria": 2,
                    "calificacion": 5,
                    "comentario": "Excelente asesoria.",
                }
            ]
        },
    )


class UpdateResenaEstadoRequest(BaseModel):
    estado: str = Field(min_length=3, max_length=10)

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "estado": "aceptada",
                }
            ]
        }
    }


class CitaCreateRequest(BaseModel):
    id_perfil: int
    id_usuario: int
    fecha: str
    hora: str

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "id_perfil": 10,
                    "id_usuario": 5,
                    "fecha": "2026-05-11",
                    "hora": "10:30",
                }
            ]
        }
    }


class DisponibilidadSemanalRequest(BaseModel):
    id_perfil: int
    dia_semana: str
    hora_inicio: time
    hora_fin: time

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "id_perfil": 10,
                    "dia_semana": "Lunes",
                    "hora_inicio": "09:00",
                    "hora_fin": "12:00",
                }
            ]
        }
    }


class VerificarQrRequest(BaseModel):
    token_qr: str

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "token_qr": "cita-uuid-123456",
                }
            ]
        }
    }


def is_public_route(request: Request) -> bool:
    if request.method == "OPTIONS":
        return True

    if (request.method, request.url.path) in PUBLIC_ROUTES:
        return True

    for prefix in PUBLIC_PATH_PREFIXES:
        if request.url.path.startswith(prefix):
            return True

    return False

#el gateway valida el token
@app.middleware("http")
async def authorization_middleware(request: Request, call_next):
    if is_public_route(request):
        return await call_next(request)

    auth_header = request.headers.get("Authorization", "")

    if not auth_header.startswith("Bearer "):
        return JSONResponse(status_code=401, content={"detail": "Unauthorized"})

    token = auth_header.split(" ", 1)[1].strip()

    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
    except JWTError:
        return JSONResponse(status_code=401, content={"detail": "Unauthorized"})

    user_id = payload.get("sub")
    role = payload.get("role")

    if not user_id or not role:
        return JSONResponse(status_code=401, content={"detail": "Unauthorized"})

    request.state.user_id = str(user_id)
    request.state.user_role = str(role)

    return await call_next(request)

# auth_service


def build_forward_headers(request: Request):
    headers = {}

    authorization = request.headers.get("Authorization")
    if authorization:
        headers["Authorization"] = authorization

    user_id = getattr(request.state, "user_id", None)
    user_role = getattr(request.state, "user_role", None)

    if user_id:
        headers["X-User-ID"] = user_id

    if user_role:
        headers["X-User-Role"] = user_role

    return headers

def forward_response(response):
    return Response(
        content=response.content,
        status_code=response.status_code,
        media_type=response.headers.get("content-type", "application/json")
    )


@app.post("/auth/login")
async def login(payload: LoginRequest, request: Request):
    body = payload.model_dump()

    response = requests.post(
        f"{AUTH_SERVICE_URL}/auth/login",
        json=body,
        headers=build_forward_headers(request),
    )

    return forward_response(response)


@app.post("/auth/register")
async def register(payload: RegisterRequest, request: Request):
    body = payload.model_dump()

    response = requests.post(
        f"{AUTH_SERVICE_URL}/auth/register",
        json=body,
        headers=build_forward_headers(request),
    )

    return forward_response(response)


@app.get("/auth/users/{id_usuario}")
async def get_user_by_id(id_usuario: int, request: Request):
    response = requests.get(
        f"{AUTH_SERVICE_URL}/auth/users/{id_usuario}",
        headers=build_forward_headers(request),
    )
    return forward_response(response)


@app.put("/auth/users/{id_usuario}")
async def update_user(id_usuario: int, payload: UpdateUserRequest, request: Request):
    body = payload.model_dump(exclude_none=True)

    response = requests.put(
        f"{AUTH_SERVICE_URL}/auth/users/{id_usuario}",
        json=body,
        headers=build_forward_headers(request),
    )

    return forward_response(response)

@app.get("/auth/users")
async def get_all_users(request: Request):
    response = requests.get(
        f"{AUTH_SERVICE_URL}/auth/users",
        headers=build_forward_headers(request),
    )
    return forward_response(response)

@app.put("/auth/users/{id_usuario}/status")
async def update_user_status(id_usuario: int, payload: UpdateStatusRequest, request: Request):
    body = payload.model_dump()
    response = requests.put(
        f"{AUTH_SERVICE_URL}/auth/users/{id_usuario}/status",
        json=body,
        headers=build_forward_headers(request),
    )
    return forward_response(response)


# materias_service

@app.get("/materias")
async def get_materias(request: Request):
    response = requests.get(
        f"{MATERIA_SERVICE_URL}/materias",
        headers=build_forward_headers(request),
    )
    return forward_response(response)


@app.get("/lenguajes")
async def get_lenguajes(request: Request):
    response = requests.get(
        f"{MATERIA_SERVICE_URL}/lenguajes/",
        headers=build_forward_headers(request),
    )
    return forward_response(response)

# calendario
@app.post("/calendario/citas")
async def crear_cita(payload: CitaCreateRequest, request: Request):
    body = payload.model_dump()

    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{CALENDAR_SERVICE_URL}/calendario/citas",
            json=body,
            headers=build_forward_headers(request)
        )

    return Response(
        content=response.content,
        status_code=response.status_code,
        media_type="application/json"
    )

@app.post("/calendario/disponibilidad-semanal")
async def crear_disponibilidad(payload: DisponibilidadSemanalRequest, request: Request):
    body = payload.model_dump()

    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{CALENDAR_SERVICE_URL}/calendario/disponibilidad",
            json=body,
            headers=build_forward_headers(request)
        )

    return Response(
        content=response.content,
        status_code=response.status_code,
        media_type="application/json"
    )

@app.get("/calendario/disponibilidad")
async def get_disponibilidad(request: Request):
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{CALENDAR_SERVICE_URL}/calendario/disponibilidad",
            params=dict(request.query_params),
            headers=build_forward_headers(request)
        )

    return Response(
        content=response.content,
        status_code=response.status_code,
        media_type="application/json"
    )


# advisor_service

@app.post("/advisors")
async def create_advisor(payload: CreateAdvisorRequest, request: Request):
    body = payload.model_dump()
    
    response = requests.post(
        f"{ADVISOR_SERVICE_URL}/advisors/",
        json=body,
        headers=build_forward_headers(request),
    )
    
    return forward_response(response)


@app.get("/advisors")
async def get_all_advisors(request: Request):
    response = requests.get(
        f"{ADVISOR_SERVICE_URL}/advisors/",
        headers=build_forward_headers(request),
    )
    return forward_response(response)


@app.get("/advisors/pending")
async def get_pending_advisors(request: Request):
    response = requests.get(
        f"{ADVISOR_SERVICE_URL}/advisors/pending",
        headers=build_forward_headers(request),
    )
    return forward_response(response)


@app.get("/advisors/{id_perfil}")
async def get_advisor_by_id(id_perfil: int, request: Request):
    response = requests.get(
        f"{ADVISOR_SERVICE_URL}/advisors/{id_perfil}",
        headers=build_forward_headers(request),
    )
    return forward_response(response)


@app.get("/advisors/user/{id_usuario_auth}")
async def get_advisor_by_user_id(id_usuario_auth: int, request: Request):
    response = requests.get(
        f"{ADVISOR_SERVICE_URL}/advisors/user/{id_usuario_auth}",
        headers=build_forward_headers(request),
    )
    return forward_response(response)


@app.put("/advisors/{id_perfil}")
async def update_advisor(id_perfil: int, payload: UpdateAdvisorRequest, request: Request):
    body = payload.model_dump(exclude_none=True)
    
    response = requests.put(
        f"{ADVISOR_SERVICE_URL}/advisors/{id_perfil}",
        json=body,
        headers=build_forward_headers(request),
    )
    
    return forward_response(response)


@app.put("/advisors/{id_perfil}/approve")
async def approve_advisor(id_perfil: int, payload: UpdateAdvisorRequest, request: Request):
    body = payload.model_dump(exclude_none=True)

    response = requests.put(
        f"{ADVISOR_SERVICE_URL}/advisors/{id_perfil}/approve",
        json=body,
        headers=build_forward_headers(request),
    )

    return forward_response(response)


@app.delete("/advisors/{id_perfil}")
async def delete_advisor(id_perfil: int, request: Request):
    response = requests.delete(
        f"{ADVISOR_SERVICE_URL}/advisors/{id_perfil}",
        headers=build_forward_headers(request),
    )
    return forward_response(response)


# review_service

@app.post("/resenas")
async def create_resena(payload: CreateResenaRequest, request: Request):
    body = payload.model_dump(by_alias=True)

    response = requests.post(
        f"{REVIEW_SERVICE_URL}/resenas",
        json=body,
        headers=build_forward_headers(request),
    )

    return forward_response(response)


@app.get("/resenas")
async def list_resenas(request: Request):
    response = requests.get(
        f"{REVIEW_SERVICE_URL}/resenas",
        params=dict(request.query_params),
        headers=build_forward_headers(request),
    )

    return forward_response(response)


@app.put("/resenas/{id_resena}/estado")
async def update_resena_estado(
    id_resena: int,
    payload: UpdateResenaEstadoRequest,
    request: Request,
):
    body = payload.model_dump()

    response = requests.put(
        f"{REVIEW_SERVICE_URL}/resenas/{id_resena}/estado",
        json=body,
        headers=build_forward_headers(request),
    )

    return forward_response(response)

@app.delete("/resenas/{id_resena}")
async def delete_resena(id_resena: int, request: Request):
    response = requests.delete(
        f"{REVIEW_SERVICE_URL}/resenas/{id_resena}",
        headers=build_forward_headers(request),
    )
    return forward_response(response)

# content_service
@app.post("/contents/upload/")
async def upload_content(
    request: Request,
    id_perfil: int,
    id_materia: int
):

    form = await request.form()

    file = form["file"]

    files = {
        "file": (
            file.filename,
            file.file,
            file.content_type
        )
    }

    data = {
        "id_perfil": id_perfil,
        "id_materia": id_materia
    }

    response = requests.post(
        f"{CONTENT_SERVICE_URL}/contents/upload/",
        files=files,
        data=data,
        headers=build_forward_headers(request),
    )

    return forward_response(response)

@app.get("/contents/materia/{id_materia}")
async def get_contents_by_materia(id_materia: int, request: Request):

    response = requests.get(
        f"{CONTENT_SERVICE_URL}/contents/materia/{id_materia}",
        headers=build_forward_headers(request),
    )

    return forward_response(response)

@app.get("/contents/perfil/{id_perfil}")
async def get_contents_by_perfil(id_perfil: int, request: Request):

    response = requests.get(
        f"{CONTENT_SERVICE_URL}/contents/perfil/{id_perfil}",
        headers=build_forward_headers(request),
    )

    return forward_response(response)

@app.get("/contents/download/{id_contenido}")
async def download_content(id_contenido: int, request: Request):

    response = requests.get(
        f"{CONTENT_SERVICE_URL}/contents/download/{id_contenido}",
        headers=build_forward_headers(request),
    )

    return forward_response(response)

@app.delete("/contents/{id_contenido}")
async def delete_content(id_contenido: int, request: Request):

    response = requests.delete(
        f"{CONTENT_SERVICE_URL}/contents/{id_contenido}",
        headers=build_forward_headers(request),
    )

    return forward_response(response)

# report_service
@app.post("/reportes")
async def create_report(request: Request):
    body = await request.json()
    response = requests.post(
        f"{REPORT_SERVICE_URL}/reportes",
        json=body,
        headers=build_forward_headers(request),
    )
    return forward_response(response)

@app.get("/reportes")
async def get_all_reports(request: Request):
    response = requests.get(
        f"{REPORT_SERVICE_URL}/reportes",
        headers=build_forward_headers(request),
    )
    return forward_response(response)

@app.get("/reportes/usuario/{id_usuario}")
async def get_reports_by_user(id_usuario: int, request: Request):
    response = requests.get(
        f"{REPORT_SERVICE_URL}/reportes/usuario/{id_usuario}",
        headers=build_forward_headers(request),
    )
    return forward_response(response)

@app.put("/reportes/{id_reporte}/estado")
async def update_report_status(id_reporte: int, request: Request):
    body = await request.json()
    response = requests.put(
        f"{REPORT_SERVICE_URL}/reportes/{id_reporte}/estado",
        json=body,
        headers=build_forward_headers(request),
    )
    return forward_response(response)

# calendar: nuevos endpoints 
@app.get("/calendario/citas/asesor/{id_perfil}")
async def get_citas_asesor(id_perfil: int, request: Request):
    response = requests.get(
        f"{CALENDAR_SERVICE_URL}/calendario/citas/asesor/{id_perfil}",
        headers=build_forward_headers(request),
    )
    return forward_response(response)


@app.patch("/calendario/citas/{id_cita}/cancelar")
async def cancelar_cita_gateway(id_cita: int, request: Request):
    response = requests.patch(
        f"{CALENDAR_SERVICE_URL}/calendario/citas/{id_cita}/cancelar",
        headers=build_forward_headers(request),
    )
    return forward_response(response)


# qr-service 
@app.post("/qr/generar/{id_cita}")
async def generar_qr(id_cita: int, request: Request):
    response = requests.post(
        f"{QR_SERVICE_URL}/qr/generar/{id_cita}",
        headers=build_forward_headers(request),
    )
    return forward_response(response)


@app.post("/qr/verificar")
async def verificar_qr(payload: VerificarQrRequest, request: Request):
    body = payload.model_dump()
    response = requests.post(
        f"{QR_SERVICE_URL}/qr/verificar",
        json=body,
        headers=build_forward_headers(request),
    )
    return forward_response(response)


@app.get("/qr/estado/{id_cita}")
async def estado_qr(id_cita: int, request: Request):
    response = requests.get(
        f"{QR_SERVICE_URL}/qr/estado/{id_cita}",
        headers=build_forward_headers(request),
    )
    return forward_response(response)