#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
from datetime import datetime
from random import randint
from faker import Faker
from faker.providers import DynamicProvider
import mysql.connector
from passlib.context import CryptContext

num_clinicas = 50
num_propietarios = 1000

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

vowels = ('a', 'e', 'i', 'o', 'u')
somecons = ('b', 'd', 'f', 'k', 'l', 'm', 'p', 'r', 's')
nifLetters = ('T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B',
              'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E')

fake = Faker('es_ES')
conn = mysql.connector.connect(database="amep13",
                               user="amep13",
                               password="ue3Pi4ooquo7-",
                               host="ubiwan.epsevg.upc.edu")
c = conn.cursor()

os.remove('queries.sql')
f = open('queries.sql', 'a')

medical_professions_provider = DynamicProvider(
  provider_name="medical_profession",
  elements=["Dr.", "Dra."],
)
clinic = DynamicProvider(
  provider_name="clinic",
  elements=['Más Salud', 'Mascotas', 'Vida', 'Cuidado',
            'Clínica', 'Pets', 'Care'],
)
centro = DynamicProvider(
  provider_name="centro",
  elements=['Más Salud', 'Mascotas', 'Vida', 'Cuidado',
            'Clínica', 'Pets', 'Care'],
)
email_domain = DynamicProvider(
  provider_name="email_domain",
  elements=['hotmail', 'gmail', 'outlook', 'yahoo', 'moho'],
)
email_suffix = DynamicProvider(
  provider_name="email_suffix",
  elements=['es', 'com', 'org', 'net', 'edu'],
)

fake.add_provider(medical_professions_provider)
fake.add_provider(clinic)
fake.add_provider(centro)
fake.add_provider(email_domain)
fake.add_provider(email_suffix)

q = "SELECT * FROM Especie;"
c.execute(q)
especies = c.fetchall()



def do_query(c, q, p):
  c.execute(q, p)
  f.write(str(c._executed) + '\n')

def r(lim):
  "0 <= random int < lim"
  return randint(0, lim-1)

def randname(syll):
  "random name with syll 2-letter syllables"
  v = len(vowels)
  c = len(somecons)
  res = str()
  for i in range(syll):
    res += somecons[r(c)] + vowels[r(v)]
  return res.capitalize()


# Función base para crear un Usuario. Retorna el username.
def create_usuario(c):
  nombre = randname(randint(2,3))
  apellidos = randname(randint(3,4))
  username = nombre[0:3]+str(randint(1000, 9999))
  password = pwd_context.hash('password')
  telefono = randint(100000000, 999999999)
  email =  username + '@' + fake.email_domain() + '.' + fake.email_suffix()

  q = "INSERT INTO Usuario (nombre, apellidos, username, password, telefono, email) VALUES (%s, %s, %s, %s, %s, %s);"
  p = (nombre, apellidos, username, password, telefono, email, )
  try:
    do_query(c, q, p)
    return username
  except mysql.connector.errors as e:
    print(e)
    conn.rollback()
  
# Crea num_propietarios Propietarios.
def create_propietarios(c):
  for i in range(num_propietarios):
    print("Creando Propietarios (%d de %d)" % (i, num_propietarios), end='\r')
    username = create_usuario(c)
    q = "INSERT INTO Propietario (username) VALUES (%s)"
    p = (username, )
    try:
      do_query(c, q, p)
      f.write(str(c._executed) + '\n')
    except mysql.connector.errors as e:
      print(e)
      conn.rollback()
  conn.commit()

# Crea num_clinicas Propietarios.
def create_gerente_clinicas(c):
  for i in range(num_clinicas):
    print("Creando Gerentes (%d de %d)" % (i, num_clinicas), end='\r')
    username = create_usuario(c)
    q = "INSERT INTO GerenteClinica (username) VALUES (%s)"
    p = (username, )
    try:
      do_query(c, q, p)
      f.write(str(c._executed) + '\n')
    except mysql.connector.errors as e:
      print(e)
      conn.rollback()
  conn.commit()

# Crea entre 1 - 5 veterinarios para cada Centro.
def create_veterinario_centro(c):
  q = "SELECT id FROM Centro;"
  c.execute(q)
  centros = c.fetchall()
  for i in range(len(centros)-1):
    print("Creando Veterinarios (%d de %d)" % (i, len(centros)-1), end='\r')
    for j in range(randint(1, 5)):
      username = create_usuario(c)
      q = "INSERT INTO VeterinarioCentro (username, idCentro) VALUES (%s, %s)"
      p = (username, centros[i],)
      try:
        do_query(c, q, p)
        f.write(str(c._executed) + '\n')
      except mysql.connector.errors as e:
        print(e)
        conn.rollback()
  conn.commit()

# Crea entre 1 - [Especies] especies para cada Centro en Acepta.
def create_acepta(c):
  q = "SELECT id FROM Centro;"
  c.execute(q)
  centros = c.fetchall()
  for i in range(len(centros)-1):
    print("Creando Acepta (%d de %d)" % (i, len(centros)-1), end='\r')
    inserted = especies.copy()
    centro = centros[i]
    for j in range(randint(1, len(especies) - 1)):
      especie = randint(0, len(inserted) - 1)

      q = "INSERT INTO Acepta (idCentro, nombreEspecie) VALUES (%s, %s)"
      p = (centro, especie,)
      try:
        do_query(c, q, p)
        f.write(str(c._executed) + '\n')
        inserted.remove(especie)
      except mysql.connector.errors as e:
        print(e)
        conn.rollback()
  conn.commit()

# Crea entre 1 - 10 Centros por cada Clinica.
def create_centro(c):
  q = "SELECT id FROM Clinica;"
  c.execute(q)
  clinicas = c.fetchall()
  for i in range(len(clinicas)-1):
    print("Creando Centros (%d de %d)" % (i, len(clinicas)-1), end='\r')
    for j in range(randint(1, 10)):
      nombre = randname(fake.centro() + ' ' + randname(randint(2,3)))
      direccion = fake.address()
      clinica = clinicas[i]
      q = "INSERT Centro (nombre, direccion, idClinica) VALUES (%s, %s, %s);"
      p = (nombre, direccion, clinica, )
      try:
        do_query(c, q, p)
        f.write(str(c._executed) + '\n')
      except mysql.connector.errors as e:
        print(e)
        conn.rollback()
  conn.commit()

# Crea tantas Clinicas como haya Gerentes sin Clinicas sin gestionar.
def create_clinica(c):
  q = """SELECT Usuario.username,
         FROM Usuario 
         INNER JOIN GerenteClinica ON GerenteClinica.username = Usuario.username
         LEFT JOIN Clinica ON Clinica.Gerente = GerenteClinica.username WHERE Clinica.Gerente IS NULL;"""
  c.execute(q)
  gerentesClinicas = c.fetchall()
  for i in range(len(gerentesClinicas) - 1):
    print("Creando Clinicas (%d de %d)" % (i, len(gerentesClinicas)-1), end='\r')
    if len(gerentesClinicas) == 0:
      break
    nombre = randname(fake.clinica() + ' ' + randname(randint(2,3)))
    gerente = gerentesClinicas[randint(len(gerentesClinicas)-1)]
    q = "INSERT INTO Clinica (nombre, Gerente) VALUES (%s, %s)"
    p = (nombre, gerente, )
    try:
      do_query(c, q, p)
      f.write(str(c._executed) + '\n')
      gerentesClinicas.remove(gerente)
    except mysql.connector.errors as e:
      print(e)
      conn.rollback()
  conn.commit()

create_propietarios(c)
create_gerente_clinicas(c)
create_clinica(c)
create_centro(c)
create_acepta(c)
create_veterinario_centro(c)
