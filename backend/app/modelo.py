from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime
from pydantic import BaseModel,EmailStr,Field
from typing import List

Base = declarative_base()

#prueba-------------------------------------------------
class usuario_registroSchema(BaseModel):
    nombre: str = Field(...)
    apellidos: str = Field(...)
    email: EmailStr = Field(...)
    password: str = Field(...)
    username: str = Field(...)
    telefono: int = Field(...)

    class Config:
        json_schema_extra = {
            "example": {
                "nombre": "Juan ",
                "apellidos": "Cifuentes",
                "email": "prueba@ejemplo.com",
                "password": "password",
                "username": "Juan Cifuentes",
                "telefono": "123456789",
            }
        }

class usuario_loginSchema(BaseModel):
    username: str = Field(...)
    password: str = Field(...)

    class Config:
        json_schema_extra = {
            "example": {
                "username": "CifuentesJ",
                "password": "password"
            }
        }

class mascota_registroSchema(BaseModel):
    nombre: str = Field(...)
    fechaNacimiento: str = Field(...)
    especie: str = Field(...)
    class Config:
        json_schema_extra = {
            "example": {
                "nombre": "musolini",
                "fechaNacimiento": "2024-05-13T22:00:00.000Z",
                "especie": "especie"
            }
        }

class centro_registroSchema(BaseModel):
    nombre: str = Field(...)
    direccion: str = Field(...)
    especies: List[str] = Field(...)
    class Config:
        json_schema_extra = {
            "example": {
                "nombre": "nombre clinica",
                "direccion": "calle 24 1-1",
                "especies": ["especie1", "especie2", "especie3"]
            }
        }

class clinica_registroSchema(BaseModel):
    nombre: str = Field(...)
    gerente: str = Field(...)
    class Config:
        json_schema_extra = {
            "example": {
                "nombre": "Clinica",
                "gerente": "username"
            }
        }
    

class citas_registroSchema(BaseModel):
    nombreMascota: str = Field(...)
    nombreCentro: str = Field(...)
    usernameVeterinario: str = Field(...)
    fechaCita: str = Field(...)

    class Config:
        json_schema_extra = {
            "example": {
                "nombreMascota": "nombre Mascota",
                "nombreCentro": "nombre centro",
                "usernameVeterinario": "Username Veterinario",
                "fechaCita": "2024-05-13T22:00:00.000Z",
            }
        } 


class MascotaRequest(BaseModel):
    mascota: str

class EspecieRequest(BaseModel):
    especie: str

class CentroRequest(BaseModel):
    centro: str

