from sqlalchemy import text
from app.infrastructure.database import SessionLocal

class UserRepositoryMySQL:

    def create_user(self, user):

        db = SessionLocal()

        query = text("""
        INSERT INTO usuarios
        (nombre, correo, telefono, contrasena, rol)
        VALUES (:nombre, :correo, :telefono, :contrasena, :rol)
        """)

        db.execute(query, {
            "nombre": user.nombre,
            "correo": user.correo,
            "telefono": user.telefono,
            "contrasena": user.contrasena,
            "rol": user.rol
        })

        db.commit()
        db.close()