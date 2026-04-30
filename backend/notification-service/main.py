from fastapi import FastAPI, HTTPException, BackgroundTasks
from pydantic import BaseModel
from typing import Dict, Any

app = FastAPI(title="Notification Service - DevMentor")

# Modelo de datos que esperamos recibir de otros microservicios
class NotificationRequest(BaseModel):
    correo_destino: str
    tipo_notificacion: str
    datos_extra: Dict[str, Any] = {}

def enviar_correo_real(destino: str, asunto: str, cuerpo: str):
    """
    Simulador de envío de correos. 
    Aquí es donde integrarías smtplib, AWS SES, SendGrid, etc.
    """
    print(f"\n{'='*60}")
    print(f"📧 ENVIANDO CORREO A: {destino}")
    print(f"📌 ASUNTO: {asunto}")
    print(f"📝 CUERPO:\n{cuerpo}")
    print(f"{'='*60}\n")

@app.post("/notificar")
async def procesar_notificacion(req: NotificationRequest, background_tasks: BackgroundTasks):
    asunto = ""
    cuerpo = ""

    # ==========================================
    # LÓGICA DE PLANTILLAS DE CORREO
    # ==========================================
    if req.tipo_notificacion == "ALERTA_LOGIN":
        asunto = "Alerta de Seguridad: Nuevo inicio de sesión"
        cuerpo = (
            "Hola,\n\n"
            "Hemos detectado un nuevo inicio de sesión en tu cuenta de Administrador en DevMentor.\n"
            "Si no fuiste tú, por favor contacta a soporte de inmediato para asegurar tu cuenta."
        )

    elif req.tipo_notificacion == "CUENTA_SUSPENDIDA":
        nombre = req.datos_extra.get("nombre", "Usuario")
        asunto = "Aviso Importante: Cuenta Suspendida"
        cuerpo = (
            f"Hola {nombre},\n\n"
            "Te informamos que tu acceso a la plataforma DevMentor ha sido suspendido "
            "debido a reportes de comportamiento que violan nuestras políticas comunitarias.\n\n"
            "Si crees que esto es un error, por favor contacta a la administración de la UNACH."
        )
        
    # TODO: Aquí puedes agregar "TUTORIA_CANCELADA" en el futuro usando elif

    else:
        # Si nos mandan un tipo de notificación que no conocemos, lanzamos error
        raise HTTPException(status_code=400, detail="Tipo de notificación no registrado en el sistema")

    # ==========================================
    # ENCOLAR LA TAREA (No bloquea el servidor)
    # ==========================================
    background_tasks.add_task(enviar_correo_real, req.correo_destino, asunto, cuerpo)

    return {
        "status": "success", 
        "mensaje": "Notificación encolada exitosamente", 
        "tipo": req.tipo_notificacion
    }