CREATE DATABASE IF NOT EXISTS asesorias;
USE asesorias;

CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    correo VARCHAR(150) NOT NULL UNIQUE,
    telefono VARCHAR(15) NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    rol ENUM('Estudiante', 'Asesor', 'Administrador') NOT NULL,
    estado ENUM('Activo', 'Suspendido') DEFAULT 'Activo',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE DATABASE IF NOT EXISTS BD_materias;
USE BD_materias;

CREATE TABLE IF NOT EXISTS carreras (
     id INT AUTO_INCREMENT PRIMARY KEY,
     nombre VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS materias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    semestre INT NOT NULL,
    carrera_id INT,
    activa BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (carrera_id) REFERENCES carreras(id)
);

CREATE TABLE IF NOT EXISTS lenguajes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255),
    imagen VARCHAR(255),
    activo BOOLEAN DEFAULT TRUE
);

INSERT INTO carreras (id, nombre) VALUES (1, 'Ingeniería en Desarrollo y Tecnologías de Software');

INSERT INTO materias (id, nombre, descripcion, semestre, carrera_id, activa) VALUES 
(1, 'Arquitectura de Software', 'Patrones de diseño, microservicios y arquitectura hexagonal.', 6, 1, 1),
(2, 'Compiladores', 'Estructura y fases de un compilador, análisis léxico y sintáctico.', 6, 1, 1),
(3, 'Redes de Computadoras', 'Configuración de VLANs, VLSM y servicios DHCP.', 5, 1, 1);

INSERT INTO lenguajes (nombre, descripcion, imagen) VALUES 
('Python', 'Lenguaje versátil ideal para backend y FastAPI', 'python.png'),
('Java', 'Programación orientada a objetos', 'java.png'),
('C++', 'Alto rendimiento y bajo nivel', 'c++.png');

CREATE DATABASE IF NOT EXISTS asesor_db;
USE asesor_db;

CREATE TABLE IF NOT EXISTS asesorias (
    id_perfil INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario_auth INT NOT NULL,
    especialidad VARCHAR(200),
    area_especialidad VARCHAR(200),
    materias JSON,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO asesorias (id_usuario_auth, especialidad, area_especialidad, materias) VALUES 
(2, 'Desarrollo Backend', 'Python y Arquitecturas Limpias', '[1, 2]'),
(3, 'Infraestructura', 'Redes y Docker', '[3]');

CREATE DATABASE IF NOT EXISTS resenas_db;
USE resenas_db;

CREATE TABLE IF NOT EXISTS resenas (
    id_resena INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_usuario_auth INT NOT NULL,
    id_materia INT NOT NULL,
    calificacion TINYINT NOT NULL CHECK (calificacion BETWEEN 1 AND 5),
    comentario TEXT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO resenas (id_resena, id_usuario, id_usuario_auth, id_materia, calificacion, comentario) VALUES 
(201, 5, 2, 1, 5, 'Excelente asesoría, comprendí todo el tema de puertos y adaptadores a la perfección.'),
(202, 5, 2, 2, 4, 'Explicó bien los árboles de derivación, pero la sesión empezó un poco tarde.'),
(203, 5, 2, 1, 1, 'Pésimo servicio, el asesor me gritó por no entender a la primera.'),
(204, 6, 2, 1, 5, 'Resolvió todas mis dudas sobre la implementación de FastAPI con RabbitMQ.'),
(205, 6, 2, 2, 5, 'Muy paciente y claro con la explicación del análisis descendente.'),
(206, 6, 2, 1, 2, 'El asesor fue muy cortante y grosero cuando le pedí que repitiera un concepto de Docker.'),
(207, 6, 2, 2, 1, 'Pérdida de tiempo. Por cierto, visiten mi sitio web de apuestas deportivas para ganar dinero rápido.'),
(208, 6, 2, 1, 3, 'La asesoría estuvo regular. Faltó profundizar en los temas de testing.');

CREATE DATABASE IF NOT EXISTS reportes_db;
USE reportes_db;

CREATE TABLE IF NOT EXISTS reportes (
    id_reporte INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario_reporta INT NOT NULL,
    id_usuario_objetivo INT NOT NULL,
    tipo_entidad ENUM('Usuario', 'Resena', 'Contenido', 'Fallo_Sistema', 'Otro') NOT NULL,
    id_entidad INT,
    motivo TEXT NOT NULL,
    estado ENUM('Pendiente', 'En Revision', 'Resuelto', 'Rechazado') DEFAULT 'Pendiente',
    prioridad ENUM('Baja', 'Media', 'Alta') DEFAULT 'Media',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO reportes (id_usuario_reporta, id_usuario_objetivo, tipo_entidad, id_entidad, motivo, estado, prioridad) VALUES 
(2, 5, 'Resena', 203, 'El alumno está mintiendo sobre mi actitud. La sesión está grabada.', 'Pendiente', 'Alta'),
(2, 6, 'Resena', 206, 'El comentario es un ataque directo y difamatorio. Solicito revisión del caso.', 'En Revision', 'Alta'),
(1, 6, 'Resena', 207, 'El estudiante está utilizando la sección de reseñas para publicar enlaces de SPAM.', 'Pendiente', 'Media'),
(4, 3, 'Usuario', 3, 'El asesor me pidió pagos externos fuera de la plataforma para darme las respuestas del examen.', 'Pendiente', 'Alta');

CREATE DATABASE IF NOT EXISTS content_db;
USE content_db;

CREATE TABLE IF NOT EXISTS contenidos (
    id_contenido INT AUTO_INCREMENT PRIMARY KEY,
    id_perfil INT NOT NULL,    
    id_materia INT NOT NULL,    
    nombre_archivo VARCHAR(255) NOT NULL,
    ruta_archivo VARCHAR(500) NOT NULL,
    tipo VARCHAR(50),
    tamaño INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);