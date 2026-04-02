from sqlalchemy import text

from app.infrastructure.database import SessionLocal


class ResenaRepositoryMySQL:
	def create_resena(self, resena):
		db = SessionLocal()

		try:
			query = text(
				"""
				INSERT INTO resenas (id_usuario, id_asesor, id_materia, calificacion, comentario)
				VALUES (:id_usuario, :id_asesor, :id_materia, :calificacion, :comentario)
				"""
			)

			result = db.execute(
				query,
				{
					"id_usuario": resena.id_usuario,
					"id_asesor": resena.id_asesor,
					"id_materia": resena.id_materia,
					"calificacion": resena.calificacion,
					"comentario": resena.comentario,
				},
			)

			id_resena = result.lastrowid
			db.commit()

			return self.get_resena_by_id(id_resena)
		finally:
			db.close()

	def get_resena_by_id(self, id_resena):
		db = SessionLocal()

		try:
			query = text(
				"""
				SELECT id_resena, id_usuario, id_asesor, id_materia, calificacion, comentario, fecha_creacion
				FROM resenas
				WHERE id_resena = :id_resena
				"""
			)

			row = db.execute(query, {"id_resena": id_resena}).fetchone()

			if row:
				return dict(row._mapping)

			return None
		finally:
			db.close()

	def list_resenas(self, id_usuario=None, id_asesor=None, id_materia=None):
		db = SessionLocal()

		try:
			conditions = []
			params = {}

			if id_usuario is not None:
				conditions.append("id_usuario = :id_usuario")
				params["id_usuario"] = id_usuario

			if id_asesor is not None:
				conditions.append("id_asesor = :id_asesor")
				params["id_asesor"] = id_asesor

			if id_materia is not None:
				conditions.append("id_materia = :id_materia")
				params["id_materia"] = id_materia

			where_clause = ""
			if conditions:
				where_clause = "WHERE " + " AND ".join(conditions)

			query = text(
				f"""
				SELECT id_resena, id_usuario, id_asesor, id_materia, calificacion, comentario, fecha_creacion
				FROM resenas
				{where_clause}
				ORDER BY fecha_creacion DESC, id_resena DESC
				"""
			)

			rows = db.execute(query, params).fetchall()

			return [dict(row._mapping) for row in rows]
		finally:
			db.close()

