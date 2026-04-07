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

        result = db.execute(query, {
            "nombre": user.nombre,
            "correo": user.correo,
            "telefono": user.telefono,
            "contrasena": user.contrasena,
            "rol": user.rol
        })

        db.commit()
        
        # Obtener el ID del usuario creado
        user_id = result.lastrowid
        
        db.close()
        
        return user_id


    def get_user_by_correo(self, correo):

        db = SessionLocal()

        query = text("SELECT * FROM usuarios WHERE correo = :correo")

        result = db.execute(query, {"correo": correo}).fetchone()

        db.close()

        if result:
            return dict(result._mapping)

        return None