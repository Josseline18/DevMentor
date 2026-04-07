vscode_lsp_terminal_prompt_tracker= {}
cd backend/auth_service
python3 -m venv usuarios
source usuarios/bin/activate
pip install -r requirements.tx
CREATE DATABASE asesorias;
	USE asesorias;

	CREATE TABLE usuarios (
		id_usuario INT AUTO_INCREMENT PRIMARY KEY,
		nombre VARCHAR(255) NOT NULL,
		correo VARCHAR(150) NOT NULL UNIQUE,
		telefono VARCHAR(15) NOT NULL,
		contrasena VARCHAR(255) NOT NULL,
		rol ENUM('Estudiante', 'Asesor') NOT NULL,
		fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);

cd backend/materia-service
python3 -m venv materias
source materias/bin/activate
pip install -r requirements.tx

    CREATE DATABASE BD_materias;
    USE BD_Materios;
    
    CREATE TABLE carreras (
         id INT AUTO_INCREMENT PRIMARY KEY,
         nombre VARCHAR(100) NOT NULL
    );
    CREATE TABLE materias (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        descripcion TEXT,
        semestre INT NOT NULL,
        carrera_id INT,
        activa BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (carrera_id) REFERENCES carreras(id)
    );

    Insert INTO Carreras (name) VALUES ('Engineering in Development and Technologies of
    Software

cd backend/advisor-service
python3 -m venv advisors
source advisors/bin/activate
pip install -r requirements.tx

    CREATE DATABASE asesor_db;
    USE Advisor_db;
    
    CREATE TABLE Asesorias (
    id_perfil INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario_auth INT NOT NULL,
    especialidad VARCHAR(200),
    area_especialidad VARCHAR(200),
    materias JSON,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

---------------------------------------------------------------------------------
En el .env que esta en Frontend donde estan las comillas deberan poner la carpeta en donde se encuendra el DevMentor y cambiar la url que ngrok les da
 
cd /home/""/DevMentor/Frontendct } from "react";c.ngrok-free.devexport const API_URL =  "https://unvoluble-pei-subrhombic.ngrok-free.dev";
---------------------------------------------------------------------------------
Terminal 1
cd backend/auth_service
source usuarios/bin/activate
uvicorn app.main:app --port 8001 --reload

Terminal 2
cd backend/materia-service
source materias/bin/activate
uvicorn app:app --port 8002 --reload

Terminal 3
cd backend/advisor-service
source advisors/bin/activate
uvicorn app.main:app --port 8003 --reload

Terminal 4
cd backend/api-gateway
source apiGw/bin/activate
uvicorn app:app --port 8000 --reload

Terminal 5:
cd Frontend
npx expo start --tunnel

Terminal 6:
ngrok http 8000