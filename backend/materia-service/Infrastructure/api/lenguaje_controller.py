from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from Infrastructure.database.connection import SessionLocal
from Infrastructure.repositories.mysql_lenguaje_repository import MySQLLenguajeRepository
from Application.use_cases.get_lenguajes import GetLenguajesUseCase

router = APIRouter(prefix="/lenguajes")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/")
def get_lenguajes(db: Session = Depends(get_db)):
    repository = MySQLLenguajeRepository(db)
    use_case = GetLenguajesUseCase(repository)
    return use_case.execute()