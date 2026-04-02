from app.adapters.repositories.review_repository_mysql import ResenaRepositoryMySQL


class ListResenasService:
    def __init__(self):
        self.repository = ResenaRepositoryMySQL()

    def execute(self, id_usuario=None, id_asesor=None, id_materia=None):
        return self.repository.list_resenas(
            id_usuario=id_usuario,
            id_asesor=id_asesor,
            id_materia=id_materia,
        )
