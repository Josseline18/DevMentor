from fastapi import FastAPI
from app.adapters.controllers.auth_controller import router

app = FastAPI()

app.include_router(router)