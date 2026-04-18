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

    def get_user_by_id(self, id_usuario):

        db = SessionLocal()

        query = text(
            "SELECT id_usuario, nombre, correo, telefono, rol "
            "FROM usuarios WHERE id_usuario = :id_usuario"
        )

        result = db.execute(query, {"id_usuario": id_usuario}).fetchone()

        db.close()

        if result:
            return dict(result._mapping)

        return None

    def update_user(self, id_usuario, nombre=None, correo=None, telefono=None, contrasena=None):

        db = SessionLocal()

        set_clauses = []
        params = {"id_usuario": id_usuario}

        if nombre is not None:
            set_clauses.append("nombre = :nombre")
            params["nombre"] = nombre

        if correo is not None:
            set_clauses.append("correo = :correo")
            params["correo"] = correo

        if telefono is not None:
            set_clauses.append("telefono = :telefono")
            params["telefono"] = telefono

        if contrasena is not None:
            set_clauses.append("contrasena = :contrasena")
            params["contrasena"] = contrasena

        if not set_clauses:
            db.close()
            return self.get_user_by_id(id_usuario)

        query = text(
            f"UPDATE usuarios SET {', '.join(set_clauses)} WHERE id_usuario = :id_usuario"
        )

        db.execute(query, params)
        db.commit()
        db.close()

        return self.get_user_by_id(id_usuario)