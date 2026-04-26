from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.domain.report import Base

# NOTA: Apuntamos al puerto 3308 de tu Docker local
DATABASE_URL = "mysql+pymysql://root:12345@localhost:3308/reportes_db"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(bind=engine)