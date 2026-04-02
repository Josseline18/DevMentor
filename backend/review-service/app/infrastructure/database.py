import os

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL = os.getenv(
	"REVIEW_DATABASE_URL",
	"mysql+pymysql://root:12345@localhost/resenas_db",
)

engine = create_engine(DATABASE_URL, pool_pre_ping=True)

SessionLocal = sessionmaker(
	autocommit=False,
	autoflush=False,
	bind=engine,
)

