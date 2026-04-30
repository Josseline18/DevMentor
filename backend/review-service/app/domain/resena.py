class Resena:
    def __init__(
        self,
        id_usuario,
        id_usuario_auth,
        id_materia,
        calificacion,
        comentario,
        estado=None,
    ):
        self.id_usuario = id_usuario
        self.id_usuario_auth = id_usuario_auth
        self.id_materia = id_materia
        self.calificacion = calificacion
        self.comentario = comentario
        self.estado = estado
