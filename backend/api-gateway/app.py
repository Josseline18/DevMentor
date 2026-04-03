from fastapi import FastAPI, Request
import requests

app = FastAPI()

AUTH_SERVICE_URL = "http://localhost:8001"
MATERIA_SERVICE_URL = "http://localhost:8002"


#auth_service

@app.post("/auth/login")
async def login(request: Request):
    body = await request.json()

    response = requests.post(
        f"{AUTH_SERVICE_URL}/auth/login",
        json=body  # 🔥 IMPORTANTE usar json=
    )

    return response.json()


@app.post("/auth/register")
async def register(request: Request):
    body = await request.json()

    response = requests.post(
        f"{AUTH_SERVICE_URL}/auth/register",
        json=body
    )

    return response.json()


# materias_service

@app.get("/materias")
async def get_materias():
    response = requests.get(f"{MATERIA_SERVICE_URL}/materias")
    return response.json()