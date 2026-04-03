from fastapi import FastAPI
from Infrastructure.api.materia_controller import router
from Infrastructure.database.connection import engine, Base

# IMPORTANTE: importar entidades
from Domain.entities.materia import Materia
from Domain.entities.carrera import Carrera

app = FastAPI(title="Materia Service")

Base.metadata.create_all(bind=engine)

app.include_router(router)