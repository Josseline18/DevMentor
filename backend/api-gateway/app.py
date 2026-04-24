import os

from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from jose import JWTError, jwt
import requests

app = FastAPI()

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, especifica los orígenes permitidos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

AUTH_SERVICE_URL = "http://localhost:8001"
MATERIA_SERVICE_URL = "http://localhost:8002"
ADVISOR_SERVICE_URL = "http://localhost:8003"
REVIEW_SERVICE_URL = "http://localhost:8004"
CONTENT_SERVICE_URL = "http://localhost:8005"

JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "change-this-secret")
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
async def login(request: Request):
    body = await request.json()

    response = requests.post(
        f"{AUTH_SERVICE_URL}/auth/login",
        json=body,
        headers=build_forward_headers(request),
    )

    return forward_response(response)


@app.post("/auth/register")
async def register(request: Request):
    body = await request.json()

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
async def update_user(id_usuario: int, request: Request):
    body = await request.json()

    response = requests.put(
        f"{AUTH_SERVICE_URL}/auth/users/{id_usuario}",
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


# advisor_service

@app.post("/advisors")
async def create_advisor(request: Request):
    body = await request.json()
    
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
async def update_advisor(id_perfil: int, request: Request):
    body = await request.json()
    
    response = requests.put(
        f"{ADVISOR_SERVICE_URL}/advisors/{id_perfil}",
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
async def create_resena(request: Request):
    body = await request.json()

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