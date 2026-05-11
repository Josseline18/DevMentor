import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = os.getenv(
	"DATABASE_URL",
	"mysql+pymysql://root:12345@mysql_db:3306/BD_materias",
)

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Crear las tablas si no existen
Base.metadata.create_all(bind=engine)

