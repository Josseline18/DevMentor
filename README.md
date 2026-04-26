🛠️ Fase 1: Docker en Windows

1. Instalar Docker Desktop
Descarga e instala Docker Desktop para Windows.

Ábrelo y ve a Settings (el ícono de engranaje arriba a la derecha).

Ve a Resources > WSL Integration.

Asegúrate de que la opción "Enable integration with my default WSL distro" esté activada.

Activa también el interruptor que dice "Ubuntu" (o el nombre de tu distro).

Haz clic en "Apply & restart".

🐳 Fase 2: Levantar la Infraestructura (Bases de Datos)
Abre tu terminal de Ubuntu (WSL2) y ejecuta:
# Entra a la carpeta
cd DevMentor/AdminDevMentor/db-docker

# Desde db-docker, levanta los contenedores en segundo plano
docker-compose up -d --build
Docker leerá el archivo init.sql y creará todas las bases de datos y tablas necesarias automáticamente.

🐍 Fase 3: Microservicios Backend (Entornos Virtuales)
Nuestra arquitectura utiliza múltiples servicios. Para cada uno, debes abrir una pestaña nueva en tu terminal de Ubuntu, crear su entorno virtual, instalar dependencias y arrancarlo.

# Terminal 1
cd backend/auth_service
source usuarios/bin/activate
pip install -r app/requirements.txt
uvicorn app.main:app --port 8001 --reload

# Terminal 2
cd backend/materia-service
source materias/bin/activate
pip install -r requirements.txt
uvicorn app:app --port 8002 --reload

# Terminal 3
cd backend/advisor-service
source advisors/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --port 8003 --reload

# Terminal 4 (reseñas)
cd backend/review-service
source resenas/bin/activate
pip install -r app/requirements.txt
uvicorn app.main:app --port 8004 --reload

# Terminal 5
cd backend/content-service
source contenidos/bin/activate
pip install -r requirements.txt
uvicorn main:app --port 8005 --reload

# Terminal 6
cd backend/report-service
source reportes/bin/activate
pip install -r app/requirements.txt 
uvicorn main:app --port 8006 --reload

# Terminal 7
cd backend/api-gateway
python3 -m venv apiGw
source apiGw/bin/activate
pip install -r requirements.txt
uvicorn app:app --port 8000 --reload

🖥️ Fase 4: Iniciar el Fontend de AdminDevMentor
Abre una nueva terminal y ve a la siguiente carpeta:
cd AdminDevMentor
Inicia el frontend:
npm install
npm run dev
👉 Acceso: Abre tu navegador en http://localhost:5173 e inicia sesión con el correo admin1@unach.mx y contraseña 12345. El código de seguridad puede ser cualquier numero de 6 digitos, por ejemplo: "123456"

🧪 Fase 5: Inyectar Datos de Prueba
Ahora que el backend está corriendo en el puerto 8000, abre una nueva terminal de Ubuntu y ejecuta estos comandos uno por uno para crear los usuarios base:

Bash
# 1. Crear Administradores
curl -X 'POST' 'http://127.0.0.1:8001/auth/register' \
  -H 'Content-Type: application/json' \
  -d '{"nombre": "Admin Principal", "correo": "admin1@unach.mx", "telefono": "9610000001", "contrasena": "12345", "rol": "Administrador"}'
echo ""

curl -X 'POST' 'http://127.0.0.1:8001/auth/register' \
  -H 'Content-Type: application/json' \
  -d '{"nombre": "Admin Secundario", "correo": "admin2@unach.mx", "telefono": "9610000002", "contrasena": "12345", "rol": "Administrador"}'
echo ""

# 2. Crear Asesores
curl -X 'POST' 'http://127.0.0.1:8001/auth/register' \
  -H 'Content-Type: application/json' \
  -d '{"nombre": "Asesor Experto", "correo": "asesor1@unach.mx", "telefono": "9610000003", "contrasena": "12345", "rol": "Asesor"}'
echo ""

curl -X 'POST' 'http://127.0.0.1:8001/auth/register' \
  -H 'Content-Type: application/json' \
  -d '{"nombre": "Asesor Junior", "correo": "asesor2@unach.mx", "telefono": "9610000004", "contrasena": "12345", "rol": "Asesor"}'
echo ""

# 3. Crear Estudiantes
curl -X 'POST' 'http://127.0.0.1:8001/auth/register' \
  -H 'Content-Type: application/json' \
  -d '{"nombre": "Alumno Nuevo", "correo": "estudiante1@unach.mx", "telefono": "9610000005", "contrasena": "12345", "rol": "Estudiante"}'
echo ""

curl -X 'POST' 'http://127.0.0.1:8001/auth/register' \
  -H 'Content-Type: application/json' \
  -d '{"nombre": "Alumno Avanzado", "correo": "estudiante2@unach.mx", "telefono": "9610000006", "contrasena": "12345", "rol": "Estudiante"}'
echo ""