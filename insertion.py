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

# if os.path.exists('queries.sql'):
#   os.remove('queries.sql')
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
result = c.fetchall()
especies = []
for especie in result:
  especies.append(especie[0])



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
  username = nombre[0:4]+str(randint(1000, 9999))
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
    except mysql.connector.errors as e:
      print(e)
      conn.rollback()
  conn.commit()
  print('')

# Crea num_clinicas Propietarios.
def create_gerente_clinicas(c):
  for i in range(num_clinicas):
    print("Creando Gerentes (%d de %d)" % (i, num_clinicas), end='\r')
    username = create_usuario(c)
    q = "INSERT INTO GerenteClinica (username) VALUES (%s)"
    p = (username, )
    try:
      do_query(c, q, p)
    except mysql.connector.errors as e:
      print(e)
      conn.rollback()
  conn.commit()
  print('')

# Crea entre 1 - 5 veterinarios para cada Centro.
def create_veterinario_centro(c):
  q = "SELECT id FROM Centro;"
  c.execute(q)
  results = c.fetchall()
  centros = []
  for a in results:
    centros.append(a[0])
  i = 1
  for centro in centros:
    print("Creando Veterinarios (%d de %d)" % (i, len(centros)-1), end='\r')
    for j in range(randint(1, 5)):
      username = create_usuario(c)
      q = "INSERT INTO VeterinarioCentro (username, idCentro) VALUES (%s, %s)"
      p = (username, centro,)
      try:
        do_query(c, q, p)
      except mysql.connector.errors as e:
        print(e)
        conn.rollback()
    i = i + 1
  conn.commit()
  print('')

# Crea entre 1 - [Especies] especies para cada Centro en Acepta.
def create_acepta(c):
  q = "SELECT id FROM Centro;"
  c.execute(q)
  centros = c.fetchall()
  i = 1
  for centro in centros:
    print("Creando Acepta (%d de %d)" % (i, len(centros)-1), end='\r')
    inserted = especies.copy()
    for j in range(randint(1, len(especies) - 1)):
      especie = inserted[randint(0, len(inserted) - 1)]
      q = "SELECT * FROM Acepta WHERE idCentro=%s AND nombreEspecie=%s"
      p = (centro[0], especie,)
      c.execute(q, p)
      result = c.fetchall()
      if len(result) > 0:
        inserted.remove(especie)
        continue
      q = "INSERT INTO Acepta (idCentro, nombreEspecie) VALUES (%s, %s)"
      p = (centro[0], especie,)
      try:
        do_query(c, q, p)
        inserted.remove(especie)
      except mysql.connector.errors as e:
        print(e)
        conn.rollback()
    i = i + 1
  conn.commit()
  print('')

# Crea entre 1 - 10 Centros por cada Clinica.
def create_centro(c):
  q = "SELECT id FROM Clinica;"
  c.execute(q)
  clinicas = c.fetchall()
  print(clinicas)
  i = 1
  for clinica in clinicas:
    print("Creando Centros (%d de %d)" % (i, len(clinicas)-1), end='\r')
    for j in range(randint(1, 10)):
      nombre = fake.centro() + ' ' + randname(randint(2,3))
      direccion = fake.address()[0:44]

      q = "INSERT INTO Centro (nombre, direccion, idClinica) VALUES (%s, %s, %s);"
      p = (nombre, direccion, clinica[0], )
      try:
        do_query(c, q, p)
      except mysql.connector.errors as e:
        print(e)
        conn.rollback()
    i = i + 1
  conn.commit()
  print('')

# Crea tantas Clinicas como haya Gerentes sin Clinicas sin gestionar.
def create_clinica(c):
  q = """SELECT Usuario.username
         FROM Usuario 
         INNER JOIN GerenteClinica ON GerenteClinica.username = Usuario.username
         LEFT JOIN Clinica ON Clinica.Gerente = GerenteClinica.username WHERE Clinica.Gerente IS NULL;"""
  c.execute(q)
  gerentesClinicas = c.fetchall()
  i = 1
  for gerente in gerentesClinicas:
    print("Creando Clinicas (%d de %d)" % (i, len(gerentesClinicas)-1), end='\r')
    if len(gerentesClinicas) == 0:
      break
    nombre = fake.clinic() + ' ' + randname(randint(2,3))
    q = "INSERT INTO Clinica (nombre, Gerente) VALUES (%s, %s)"
    p = (nombre, gerente[0], )
    print("Nombre: %s. Gerente: %s" % (nombre, gerente[0]))
    try:
      do_query(c, q, p)
    except mysql.connector.errors as e:
      print(e)
      conn.rollback()
    i = i + 1
  conn.commit()
  print('')

# Crea 1 - 5 mascotas por cada Propietario
def create_mascotas(c):
  q = "SELECT username FROM Propietario;"
  c.execute(q)
  results = c.fetchall()
  propietarios = []
  for a in results:
    propietarios.append(a[0])
  i = 1
  for propietario in propietarios:
    print("Creando mascotas (%d de %d)" % (i, len(propietarios) - 1), end='\r')
    for j in range(randint(1, 5)):
      nombre = randname(randint(2,3))
      nacimiento = fake.date_between_dates(date_start=datetime(2015,1,1), date_end=datetime(2024,5,20))
      especie = especies[randint(0, len(especies) - 1)]
      q = "INSERT INTO Mascota (nombre, nacimiento, especie, propietario) VALUES (%s, %s, %s, %s);"
      p = (nombre, nacimiento, especie, propietario, )

      try:
        do_query(c, q, p)
      except mysql.connector.errors as e:
        print(e)
        conn.rollback()
    i = i + 1
  conn.commit()
  print('')

def create_citas(c):
  q = "SELECT idMascota, especie FROM Mascota;"
  c.execute(q)
  mascotas = c.fetchall()

  q = """SELECT id, nombreEspecie, username FROM Centro
         JOIN Acepta ON Acepta.idCentro=Centro.id
         JOIN VeterinarioCentro ON VeterinarioCentro.idCentro=Centro.id;"""
  c.execute(q)
  results = c.fetchall()
  especie_centro = { }
  for especie in especies:
    especie_centro.update({ especie: [] })
  for result in results:
    centro = dict(id=result[0], veterinario=result[2])
    especie_centro.get(result[1]).append(centro)
  # { "Gato" : [
  #            { id: 1
  #              veterinario: "curador"
  #            },
  #            { id: 2
  #              veterinario: "dr jose"
  #            }
  #            ] }
  i = 1
  for mascota in mascotas:
    print("Creando Citas (%d de %d)" % (i, len(mascotas) - 1), end='\r')
    for j in range(0,1):
      fecha = fake.date_time_between_dates(datetime_start=datetime(2024,6,20), datetime_end=datetime(2025,1,1))
      fecha = fecha.strftime('%Y-%m-%d %H:%M:%S')
      randIndex = randint(0, len(especie_centro.get(mascota[1])) - 1)
      centro = especie_centro.get(mascota[1])[randIndex].get('id')
      veterinario = especie_centro.get(mascota[1])[randIndex].get('veterinario')
      q = "INSERT INTO Cita (idCentro, idMascota, fecha, Veterinario) VALUES (%s, %s, %s, %s);"
      p = (centro, mascota[0], fecha, veterinario, )
      try:
        do_query(c, q, p)
      except mysql.connector.errors as e:
        print(e)
        conn.rollback()
    i = i+1
  conn.commit()
  print('')


# create_propietarios(c)
# create_gerente_clinicas(c)
# create_clinica(c)
# create_centro(c)
# create_acepta(c)
# create_veterinario_centro(c)
# create_mascotas(c)
# create_citas(c)