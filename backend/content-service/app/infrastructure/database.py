from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.domain.content import Base

DATABASE_URL = "mysql+pymysql://root:12345@localhost:3308/content_db"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base.metadata.create_all(bind=engine)