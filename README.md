vscode_lsp_terminal_prompt_tracker= {}

Los pasos que ya hayan realizado anteriormente como algunos entornos ya creados o bases de datos ya no tienen que repetirlos.
1-------------------------------------------------------------------------------------------------------
cd backend/auth_service
python3 -m venv usuarios
source usuarios/bin/activate
pip install -r requirements.txt

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

2-------------------------------------------------------------------------------------------------------
cd backend/materia-service
python3 -m venv materias
source materias/bin/activate
pip install -r requirements.txt

    CREATE DATABASE BD_materias;
    USE BD_materias;
    
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

    INSERT INTO carreras (nombre) VALUES ('Ingenieria en Desarrollo y Tecnologias de
    Software');

    INSERT INTO materias (nombre, descripcion, semestre, carrera_id, activa)
    VALUES ('Compiladores', 'compiladores...', 6, 1, 1);
    INSERT INTO materias (nombre, descripcion, semestre, carrera_id, activa)
    VALUES ('Economía', 'Fundamentos de economía ', 6, 1, 1);

3------------------------------------------------------------------------------------------------------
cd backend/api-gateway 
python3 -m venv apiGw
source apiGw/bin/activate
pip install -r requirements.txt

4-------------------------------------------------------------------------------------
cd backend/advisor-service
python3 -m venv advisors
source advisors/bin/activate
pip install -r requirements.txt

    CREATE DATABASE asesor_db;
    USE asesor_db;
    
    CREATE TABLE asesorias (
    id_perfil INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario_auth INT NOT NULL,
    especialidad VARCHAR(200),
    area_especialidad VARCHAR(200),
    materias JSON,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

5 ------------------------ Microservicio reseñas ---------------------------------
# Base de datos 
CREATE DATABASE resenas_db;
USE resenas_db;

CREATE TABLE resenas (
    id_resena INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_asesor INT NOT NULL,
    id_materia INT NOT NULL,
    calificacion TINYINT NOT NULL CHECK (calificacion BETWEEN 1 AND 5),
    comentario TEXT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

# Pasos para este microservicio 
cd backend/review-service
python3 -m venv resenas
source resenas/bin/activate
pip install -r requirements.txt


6 ---------------------------------------------------------------------------------
En el .env que se creo en Frontend deben de remplazar lo que tengan por lo siguiente:
 
cd /home/""/DevMentor/Frontendct } from "react";c.ngrok-free.devexport const API_URL =  "https://unvoluble-pei-subrhombic.ngrok-free.dev";

Donde estan las comillas van a remplazar por la carpeta donde tengan el proyecto, y van a remplazar su url de ngrok

7 ---------------------------------------------------------------------------------
Deben crear en Frontend/src/config el archivo api.js
Ahí colocan lo siguiete: 

import Constants from "expo-constants";

const expoConfig = Constants.expoConfig || Constants.manifest;

export const API_URL =
  expoConfig?.extra?.API_URL ||
  "https://splendent-johana-gelatinous.ngrok-free.dev";

Igualmente remplazan por su url de ngrok

8 ------------------------------------------------------------------------------------
Tienen que dirigirse al archivo app.json que esta en /Frontend
Ahí editan en la parte inferior lo siguiente:

    "extra": {
      "API_URL": "https://splendent-johana-gelatinous.ngrok-free.dev"
    }

-Remplzan por su url de ngrok-

-----------------------------------------------------------------------------------------
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

Terminal 4 (reseñas)
cd backend/review-service
source resenas/bin/activate
uvicorn app.main:app --port 8004 --reload

Terminal 5
cd backend/api-gateway
source apiGw/bin/activate
uvicorn app:app --port 8000 --reload

Terminal 6:
cd Frontend
npx expo start --tunnel

Terminal 7:
ngrok http 8000

-----------------------------------------------------------------------------------------------------
En el gitignore dentro de backend agregamos lo siguiente así se ignoran los entornos creados hasta el momento:
# Ignorar todos los entornos virtuales
**/bin/
**/lib/
**/include/
**/pyvenv.cfg

# Ignorar carpetas de entornos virtuales por nombre
usuarios/
materias/
advisors/
apiGw/

# Python
__pycache__/
*.pyc

---------------------------------------------------------------------------------------------------------
Y en el gitignore dentro de Frontend agregamos el archivo api.js y el .env:
# Learn more https://docs.github.com/en/get-started/getting-started-with-git/ignoring-files

# dependencies
node_modules/

# Expo
.expo/
dist/
web-build/
expo-env.d.ts

# Native
.kotlin/
*.orig.*
*.jks
*.p8
*.p12
*.key
*.mobileprovision

# Metro
.metro-health-check*

# debug
npm-debug.*
yarn-debug.*
yarn-error.*

# macOS
.DS_Store
*.pem

# local env files
.env*.local

# typescript
*.tsbuildinfo

# generated native folders
/ios
/android

.env


__pycache__/
*.pyc
*.pyo
*.pyd

# Virtual environments
venv/
env/
.venv/
ENV/
*_env/

# FastAPI / logs
*.log

# Configuración local de API
src/config/api.js