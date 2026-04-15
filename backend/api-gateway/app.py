from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
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


# auth_service

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
        json=body
    )

    return forward_response(response)


@app.post("/auth/register")
async def register(request: Request):
    body = await request.json()

    response = requests.post(
        f"{AUTH_SERVICE_URL}/auth/register",
        json=body
    )

    return forward_response(response)


@app.get("/auth/users/{id_usuario}")
async def get_user_by_id(id_usuario: int):
    response = requests.get(f"{AUTH_SERVICE_URL}/auth/users/{id_usuario}")
    return forward_response(response)


# materias_service

@app.get("/materias")
async def get_materias():
    response = requests.get(f"{MATERIA_SERVICE_URL}/materias")
    return forward_response(response)

@app.get("/lenguajes")
async def get_lenguajes():
    response = requests.get(f"{MATERIA_SERVICE_URL}/lenguajes/")
    return forward_response(response)


# advisor_service

@app.post("/advisors")
async def create_advisor(request: Request):
    body = await request.json()
    
    response = requests.post(
        f"{ADVISOR_SERVICE_URL}/advisors/",
        json=body
    )
    
    return forward_response(response)


@app.get("/advisors")
async def get_all_advisors():
    response = requests.get(f"{ADVISOR_SERVICE_URL}/advisors/")
    return forward_response(response)


@app.get("/advisors/{id_perfil}")
async def get_advisor_by_id(id_perfil: int):
    response = requests.get(f"{ADVISOR_SERVICE_URL}/advisors/{id_perfil}")
    return forward_response(response)


@app.get("/advisors/user/{id_usuario_auth}")
async def get_advisor_by_user_id(id_usuario_auth: int):
    response = requests.get(f"{ADVISOR_SERVICE_URL}/advisors/user/{id_usuario_auth}")
    return forward_response(response)


@app.put("/advisors/{id_perfil}")
async def update_advisor(id_perfil: int, request: Request):
    body = await request.json()
    
    response = requests.put(
        f"{ADVISOR_SERVICE_URL}/advisors/{id_perfil}",
        json=body
    )
    
    return forward_response(response)


@app.delete("/advisors/{id_perfil}")
async def delete_advisor(id_perfil: int):
    response = requests.delete(f"{ADVISOR_SERVICE_URL}/advisors/{id_perfil}")
    return forward_response(response)


# review_service

@app.post("/resenas")
async def create_resena(request: Request):
    body = await request.json()

    response = requests.post(
        f"{REVIEW_SERVICE_URL}/resenas",
        json=body
    )

    return forward_response(response)


@app.get("/resenas")
async def list_resenas(request: Request):
    response = requests.get(
        f"{REVIEW_SERVICE_URL}/resenas",
        params=dict(request.query_params)
    )

    return forward_response(response)

