from sqlalchemy import Column, Integer, String, JSON, Text, ForeignKey, DateTime, func, create_engine
from sqlalchemy.orm import sessionmaker
from app.domain.advisor import Base

DATABASE_URL = "mysql+pymysql://root:12345@localhost/asesor_db"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Crear las tablas si no existen
Base.metadata.create_all(bind=engine)
