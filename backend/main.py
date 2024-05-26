from fastapi import FastAPI, HTTPException, Body, Depends
from pydantic import BaseModel
from app.modelo import usuario_loginSchema, usuario_registroSchema,mascota_registroSchema,clinica_registroSchema, citas_registroSchema
from app.auth.auth_handler import signJWT
from app.auth.auth_bearer import JWTBearer
from app.auth.utils import hash_pass, verifica_password,invalidate_token, is_token_invalid
from fastapi.middleware.cors import CORSMiddleware
from app.auth.auth_handler import decodeJWT
from fastapi.responses import JSONResponse
import mysql.connector
from datetime import datetime, date
from decouple import config
import json

db = mysql.connector.connect(
    host=config("host"),
    user=config("user"),
    passwd=config("password"),
    database=config("db_name")
)

origins= [
    "http://localhost:3000"
]
app = FastAPI(
        title="Petting Care",
        description="Web principal",
        version="0.1"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

def json_serial(obj):
    if isinstance(obj, date):
        return obj.isoformat()
    raise TypeError(f"Type {type(obj)} not serializable")


# Endpoint para obtener todos los elementos
@app.get("/")
async def inicio():
    return {"message" :"Main"}

@app.get("/usuarios/", tags={"Administradores"})
async def leer_usuarios():
    mycursor = db.cursor()
    mycursor.execute("SELECT * FROM Usuario")
    items = mycursor.fetchall()

    for row in items:
        print(row)
    mycursor.close()
    return items

@app.post('/veterinario/registro', tags={"Centro"})
async def registro_veterinario(centro: int, veterinario: usuario_registroSchema=Body(...)):
    mycursor = db.cursor()
    try:
        # Hash The Password DE MOMENTO NO, HAY QUE ARREGLAR LA BBDD
        hashed_pass = hash_pass(veterinario.password)
        veterinario.password = hashed_pass
        mycursor.execute("SELECT username FROM Usuario WHERE username = %s", (veterinario.username,))
        usuario_existente = mycursor.fetchone()
        if usuario_existente:
            #Ya se han registrado con el email indicado
            raise HTTPException(status_code=401, detail="Username ya registrado")
        else:
            p = (veterinario.username, veterinario.password,
                 veterinario.nombre,   veterinario.apellidos,
                 veterinario.telefono, veterinario.email, )
            mycursor.execute("""
                INSERT INTO Usuario (username, password, nombre, apellidos, telefono, email)
                VALUES (%s, %s, %s, %s, %s, %s)
                """, p)

            mycursor.execute("""
                INSERT INTO VeterinarioCentro (username, idCentro)
                VALUES (%s, %s)
                """, (veterinario.username, centro, ))

            db.commit()

            # Ahora, para obtener los valores de nombre y email después de la inserción:
            mycursor.execute("SELECT nombre, email FROM Usuario WHERE email = %s", (veterinario.email,))
            registro_exitoso = mycursor.fetchone()

            return {"message": "Registro exitoso", "data": {"nombre": registro_exitoso[0], "email": registro_exitoso[1]}}
    finally:
        # Leer todos los resultados antes de cerrar el cursor
        mycursor.fetchall()
        mycursor.close()

@app.post("/gerente/registro", tags={"Administradores"})
async def registro_gerente(usuario: usuario_registroSchema= Body(...)):
    mycursor = db.cursor()
    try:
        # Hash The Password DE MOMENTO NO, HAY QUE ARREGLAR LA BBDD
        hashed_pass = hash_pass(usuario.password)
        usuario.password = hashed_pass
        mycursor.execute("SELECT username FROM Usuario WHERE username = %s", (usuario.username,))
        usuario_existente = mycursor.fetchone()
        if usuario_existente:
            #Ya se han registrado con el email indicado
            raise HTTPException(status_code=401, detail="Username ya registrado")
        else:
            mycursor.execute("""
                INSERT INTO Usuario (username, password, nombre, apellidos, telefono, email)
                VALUES (%s, %s, %s, %s, %s, %s)
                """, (usuario.username,usuario.password,usuario.nombre,usuario.apellidos,usuario.telefono, usuario.email))

            mycursor.execute("""
                INSERT INTO GerenteClinica (username)
                VALUES (%s)
                """, (usuario.username,))

            db.commit()

            # Ahora, para obtener los valores de nombre y email después de la inserción:
            mycursor.execute("SELECT nombre, email FROM Usuario WHERE email = %s", (usuario.email,))
            registro_exitoso = mycursor.fetchone()

            return {"message": "Registro exitoso", "data": {"nombre": registro_exitoso[0], "email": registro_exitoso[1]}}
    finally:
        # Leer todos los resultados antes de cerrar el cursor
        mycursor.fetchall()
        mycursor.close()


@app.post("/usuarios/registro")
async def registro_usuario(usuario: usuario_registroSchema= Body(...)):
    mycursor = db.cursor()
    try:
        # Hash The Password DE MOMENTO NO, HAY QUE ARREGLAR LA BBDD
        hashed_pass = hash_pass(usuario.password)
        usuario.password = hashed_pass
        mycursor.execute("SELECT username FROM Usuario WHERE username = %s", (usuario.username,))
        usuario_existente = mycursor.fetchone()
        if usuario_existente:
            #Ya se han registrado con el email indicado
            raise HTTPException(status_code=401, detail="Username ya registrado")
        else:
            mycursor.execute("""
                INSERT INTO Usuario (username, password, nombre, apellidos, telefono, email)
                VALUES (%s, %s, %s, %s, %s, %s)
                """, (usuario.username,usuario.password,usuario.nombre,usuario.apellidos,usuario.telefono, usuario.email))

            mycursor.execute("""
                INSERT INTO Propietario (username)
                VALUES (%s)
                """, (usuario.username,))

            db.commit()

            # Ahora, para obtener los valores de nombre y email después de la inserción:
            mycursor.execute("SELECT nombre, email FROM Usuario WHERE email = %s", (usuario.email,))
            registro_exitoso = mycursor.fetchone()

            return {"message": "Registro exitoso", "data": {"nombre": registro_exitoso[0], "email": registro_exitoso[1]}}
    finally:
        # Leer todos los resultados antes de cerrar el cursor
        mycursor.fetchall()
        mycursor.close()


@app.post("/usuarios/login")
async def login_usuario(usuario: usuario_loginSchema):
    mycursor = db.cursor()

    # Consulta a la base de datos para verificar si el usuario existe
    mycursor.execute("""
            SELECT username, nombre, password, email FROM Usuario
            WHERE username = %s
            """, (usuario.username,))
    user_data = mycursor.fetchone()
    # Verifica si se encontró un usuario con el correo electrónico proporcionado
    if user_data is None:
        raise HTTPException(status_code=401, detail="Username no registrado")

    # Extrae el hash almacenado en la base de datos
    stored_hash = user_data[2]

    if not verifica_password( usuario.password, stored_hash):
        raise HTTPException(status_code=401, detail="Contraseña no coincide")

    # Si las credenciales son válidas, emite un token JWT
    token = signJWT(usuario.username)
    
    mycursor.execute("SELECT username FROM Propietario WHERE username = %s", (usuario.username, ))
    ret = mycursor.fetchone()

    if ret is not None and ret[0] == usuario.username:
        # return { "tipo": "Propietario",
        #          "token": token}
        return JSONResponse(content={"token": token, "tipo": "Propietario"})
    
    mycursor.execute("SELECT username FROM GerenteClinica WHERE username = %s", (usuario.username, ))
    ret = mycursor.fetchone()
    if ret is not None and ret[0] == usuario.username:
        # return {"tipo": "GerenteClinica",
        #         "token": token}
        return JSONResponse(content={"token": token, "tipo": "GerenteClinica"})

    mycursor.execute("SELECT username FROM VeterinarioCentro WHERE username = %s", (usuario.username, ))
    ret = mycursor.fetchone()
    if ret is not None and ret[0] == usuario.username:
        # return {"tipo": "VeterinarioCentro",
        #         "token": token}
        return JSONResponse(content={"token": token, "tipo": "VeterinarioCentro"})
    mycursor.execute("SELECT username FROM Administrador WHERE username = %s", (usuario.username, ))
    ret = mycursor.fetchone()
    if ret is not None and ret[0] == usuario.username:
        # return {"tipo": "Administrador",
        #         "token": token}
        return JSONResponse(content={"token": token, "tipo": "Administrador"})

    mycursor.close()

    # return {"token": token}
    return JSONResponse(content={"token": token, "email": user_data[3]})


@app.post("/usuarios/logout")
async def logout_usuario(token: str = Depends(JWTBearer())):
    # Verificar si el token ya está en la lista de tokens inválidos
    if is_token_invalid(token):
        raise HTTPException(status_code=401, detail="El token ya está invalidado")

    # Invalidar el token
    invalidate_token(token)
    return {"message": "Sesión cerrada exitosamente"}


# @app.post("/pr_autenticar")
# async def prueba_bearer(token: str = Depends(JWTBearer())):
#     if is_token_invalid(token):
#         raise HTTPException(status_code=401, detail="El token ya está invalidado")
#     return {
#         "data": "estas dentro"
#     }


# Get para ver mi perfil
@app.get("/perfil", tags={"Propietario"})
async def obtener_perfil(token: str = Depends(JWTBearer())):
    # if is_token_invalid(token):
    #      raise HTTPException(status_code=401, detail="El token ya está invalidado")

    # Decodificar el token para obtener el correo electrónico del usuario
    usuario_username = decodeJWT(token)
    # Consulta a la base de datos para obtener el perfil del usuario
    mycursor = db.cursor()

    mycursor.execute("""
            SELECT *
            FROM Usuario
            WHERE username = %s
            """, (usuario_username,))
    perfil = mycursor.fetchone()

    # Si no se encuentra el perfil, devuelve un error
    if perfil is None:
        mycursor.close()
        raise HTTPException(status_code=404, detail="Perfil no encontrado")

    mycursor.close()
    # Devuelve la información del perfil en formato JSON

    return JSONResponse(content={"username": perfil[0], "nombre": perfil[2], "apellidos": perfil[3], "telefono": perfil[4], "email": perfil[5]})


# Endpoint para registrar una mascota
@app.post("/mascotas/registro", tags={"Propietario"})
async def registro_mascota(token: str = Depends(JWTBearer()),mascota: mascota_registroSchema= Body(...)):
    print(token)
    # Decodificar el token para obtener el username del usuario
    usuario_username = decodeJWT(token)

    # Cadena de fecha y hora recibida
    fecha_hora_str = mascota.fechaNacimiento

    # Convertir la cadena a un objeto de fecha y hora
    fecha_hora = datetime.strptime(fecha_hora_str, "%Y-%m-%dT%H:%M:%S.%fZ")

    # Obtener solo la fecha como una cadena
    mascota.fechaNacimiento = fecha_hora.strftime("%Y-%m-%d")

    print(mascota.fechaNacimiento)
    # Consulta a la base de datos para obtener el perfil del usuario
    mycursor = db.cursor()

    mycursor.execute("""
        INSERT INTO Mascota (nombre, nacimiento, especie, propietario)
                    VALUES (%s, %s, %s, %s)

                    """, (mascota.nombre,mascota.fechaNacimiento,mascota.especie, usuario_username))
    db.commit()
                    # Ahora, para obtener los valores de nombre y email después de la inserción:
    mycursor.execute("SELECT nombre FROM Mascota WHERE nombre = %s and propietario = %s", (mascota.nombre,usuario_username))
    registro_exitoso = mycursor.fetchall()

    mycursor.close()

    if registro_exitoso:
    # Si hay resultados, construye la respuesta con los nombres de las mascotas encontradas
        nombres_mascotas = [registro[0] for registro in registro_exitoso]
        return {"message": "Mascota añadida correctamente ", "data": {"nombres_mascotas": nombres_mascotas}}
    else:
    # Si no hay resultados, devuelve un mensaje indicando que no se encontraron mascotas
        return {"message": "No se ha podido registrar"}


# Endpoint para ver mis mascotas
@app.get("/Mascotas/misMascotas/", tags={"Propietario"})
async def obtener_mascotas(token: str = Depends(JWTBearer())):

    if is_token_invalid(token):
         raise HTTPException(status_code=401, detail="El token ya está invalidado")

    # Decodificar el token para obtener el username del usuario
    usuario_username = decodeJWT(token)

    # Consulta a la base de datos para obtener el perfil del usuario
    mycursor = db.cursor()

    mycursor.execute("""
            SELECT idMascota, nombre, nacimiento, especie
            FROM Mascota
            WHERE propietario = %s
            """, (usuario_username,))
    perfil = mycursor.fetchall()
    mycursor.close()

    # Si no se encuentra el perfil, devuelve un error
    # if perfil is None:
    if not perfil:
        raise HTTPException(status_code=404, detail=f"No hay mascotas asociadas al username {usuario_username}")
    columns = ['idMascota', 'nombre', 'nacimiento', 'especie']
    data = []
    for row in perfil:
        mascota = dict(zip(columns, row))
        data.append(mascota)
    print(data)
    return data
    # Devuelve la información del perfil en formato JSON
    # return JSONResponse(content={"nombre": perfil[0], "email": perfil[1]})
    # FALTA PASARLO COMO UN JSON ?

@app.get('/Gerentes', tags={"Administradores"})
async def obtener_gerentes():
    cursor = db.cursor()
    cursor.execute("""SELECT Usuario.username, Usuario.nombre, Usuario.apellidos, 
                   Usuario.telefono, Usuario.email FROM Usuario INNER JOIN 
                   GerenteClinica ON GerenteClinica.username = Usuario.username;""")
    gerentes = cursor.fetchall()
    cursor.close()
    columns = ['username', 'nombre', 'apellidos', 'telefono', 'email']
    data = []
    for gerente in gerentes:
        data.append(dict(zip(columns, gerente)))
    return data

@app.get('/Clinicas', tags={"Administradores"})
async def obtener_clinicas():
    cursor = db.cursor()
    cursor.execute("""SELECT Clinica.id, Clinica.nombre, Usuario.nombre,
                   Usuario.apellidos FROM Clinica INNER JOIN 
                   Usuario ON Clinica.Gerente=Usuario.username;""")
    clinicas = cursor.fetchall()
    cursor.close()
    columns = ['id', 'nombre', 'Gerente']
    data = []
    for row in clinicas:
        clinica = dict(zip(columns, [row[0], row[1], row[2] + ' ' + row[3]]))
        data.append(clinica)
    return data

@app.post('/Clinicas/registro', tags={"Administradores"})
async def registrar_clinica(clinica: clinica_registroSchema=Body(...)):
    nombre = clinica.nombre
    gerente = clinica.gerente
    p = (nombre, gerente, )

    cursor = db.cursor()
    print("""INSERT INTO Clinica (nombre, Gerente) VALUES (%s, %s)""", p)
    cursor.execute("""INSERT INTO Clinica (nombre, Gerente) VALUES (%s, %s)""", p)
    db.commit()
    print("Clinica ha sido insertado")
    cursor.close()

@app.get('/Clinicas/Centros', tags={"Clinica"})
async def obtener_centros_de_clinica(token: str = Depends(JWTBearer())):
    if is_token_invalid(token):
         raise HTTPException(status_code=401, detail="El token ya está invalidado")
    username = decodeJWT(token)

    cursor = db.cursor()
    cursor.execute("""SELECT id FROM Clinica WHERE Gerente=%s""", (username, ))
    idClinica = cursor.fetchone()
    print(idClinica)

    cursor.execute("""SELECT id, nombre FROM Centro WHERE idClinica=%s""",(idClinica))
    rows = cursor.fetchall()
    cursor.close()

    columns = ['id', 'nombre']
    data = []
    for row in rows:
        data.append(zip(columns, [row[0], row[1]]))
    return data

@app.get('/Clinicas/Veterinarios', tags={"Clinica"})
async def obtener_veterinarios_centros(token: str = Depends(JWTBearer())):
    if is_token_invalid(token):
         raise HTTPException(status_code=401, detail="El token ya está invalidado")
    gerente = decodeJWT(token)

    cursor = db.cursor()
    cursor.execute("""SELECT Usuario.username, Usuario.nombre, Usuario.apellidos, Usuario.telefono, Usuario.email, Centro.nombre AS centro
                   FROM Usuario 
                   INNER JOIN VeterinarioCentro ON Usuario.username = VeterinarioCentro.username
                   INNER JOIN Centro ON VeterinarioCentro.idCentro = Centro.id
                   LEFT JOIN Clinica ON Centro.idClinica = Clinica.id WHERE Clinica.Gerente=%s;""",(gerente,))
    rows = cursor.fetchall()
    print(rows)

    columns=['username', 'nombre', 'apellidos', 'telefono', 'email', 'centro']
    data = []
    for veterinario in rows:
        data.append(zip(columns, veterinario))
    print(data)
    return data

@app.get("/UserGerentes", tags={"Clinica"})
async def obtener_gerentes():
    cursor = db.cursor()
    cursor.execute("""SELECT Usuario.username, Usuario.nombre, Usuario.apellidos
                      FROM Usuario 
                      INNER JOIN GerenteClinica ON GerenteClinica.username = Usuario.username
                      LEFT JOIN Clinica ON Clinica.Gerente = GerenteClinica.username WHERE Clinica.Gerente IS NULL;""")
    gerentes = cursor.fetchall()
    cursor.close()
    columns = ['username', 'nombres']
    data = []
    for gerente in gerentes:
        data.append(zip(columns, [gerente[0], gerente[1] + ' ' + gerente[2]]))
    return data

@app.get("/Especies/", tags={"Mascota"})
async def obtener_especies():
    # Consulta a la base de datos para obtener las especies
    mycursor = db.cursor()

    mycursor.execute("""
            SELECT *
            FROM Especie
            """)
    especies = mycursor.fetchall()

    # Si no se encuentra especies, devuelve un error
    # if perfil is None:
    if not especies:
        mycursor.close()
        raise HTTPException(status_code=404, detail=f"No hay especies")

    for row in especies:
        print(row)
    mycursor.close()
    return especies
# Endpoint para agregar un nuevo elemento

#FALTA EL GET MASCOTA{ID}
#FALTAN ENDPOINTS DE CITAS
@app.get("/Centros", tags={"Centro"})
async def obtener_centros():
    # Consulta a la base de datos para obtener los centros disponibles
    mycursor = db.cursor()

    mycursor.execute("""
            SELECT *
            FROM Centro 
            """)
    centros = mycursor.fetchone()

    # Si no se encuentra centros, devuelve un error
    if not centros:
        mycursor.close()
        raise HTTPException(status_code=404, detail="No hay centros disponibles")

    mycursor.close()
    # Devuelve la información de los centros en formato JSON
    return centros



# CREAR CITAS (PENDIENTE DE ARREGLAR)
@app.post("/citas/crear", tags={"Propietario"})
async def registro_citas(token: str = Depends(JWTBearer()),cita: citas_registroSchema= Body(...)):
    print(token)
    # Decodificar el token para obtener el username del usuario
    usuario_username = decodeJWT(token)

    # Consulta a la base de datos para obtener el perfil de la mascota
    mycursor = db.cursor()


    mycursor.execute("""
        INSERT INTO Citas (nombre, nacimiento, especie, propietario)
                    VALUES (%s, %s, %s, %s)

                    """, (cita.nombre,cita.fechaNacimiento,cita.especie, usuario_username))

    db.commit()
                    # Ahora, para obtener los valores de nombre y email después de la inserción:
    mycursor.execute("SELECT nombre FROM Mascota WHERE nombre = %s and propietario = %s", (cita.nombre,usuario_username))
    registro_exitoso = mycursor.fetchall()
                
    mycursor.close()

    if registro_exitoso:
    # Si hay resultados, construye la respuesta con los nombres de las mascotas encontradas
        nombres_mascotas = [registro[0] for registro in registro_exitoso]
        return {"message": "Mascota añadida correctamente ", "data": {"nombres_mascotas": nombres_mascotas}}
    else:
    # Si no hay resultados, devuelve un mensaje indicando que no se encontraron mascotas
        return {"message": "No se ha podido registrar"}
    
#REGISTRO CITAS (HECHO)

@app.get("/Propietario/misCitas/", tags={"Propietario"})
async def obtener_citas(token: str = Depends(JWTBearer())):

    if is_token_invalid(token):
         raise HTTPException(status_code=401, detail="El token ya está invalidado")

    # Decodificar el token para obtener el username del usuario
    usuario_username = decodeJWT(token)
    
    # Consulta a la base de datos para obtener el perfil del usuario
    # mycursor = db.cursor(dictionary=True)

    mycursor = db.cursor()
    mycursor.execute("""
            
        SELECT 
            m.nombre AS NombreMascota, 
            c.fecha AS FechaCita, 
            cen.nombre AS NombreCentro, 
            vc.username AS VeterinarioUsername
        FROM 
            Usuario u
        JOIN 
            Mascota m ON u.username = m.propietario
        JOIN 
            Cita c ON m.idMascota = c.idMascota
        JOIN 
            Centro cen ON c.idCentro = cen.id
        JOIN 
            VeterinarioCentro vc ON c.veterinario = vc.username
        WHERE 
            u.username = %s
        AND c.fecha >= current_date() ORDER BY c.fecha ASC;
            """, (usuario_username,))
    citas = mycursor.fetchall()
    
    # Si no se encuentra el perfil, devuelve un error
    # if perfil is None:
    if not citas:
        raise HTTPException(status_code=404, detail=f"No hay citas asociadas al username {usuario_username}")
    
    # for row in citas:
    #     print(row)
    mycursor.close()

    # Devuelve la información de las citas del veterinario en formato JSON

    citas_serializadas = [
        {
            "NombreMascota": cita[0],
            "FechaCita": cita[1],
            "NombreCentro": cita[2],
            "VeterinarioUsername": cita[3]
        } for cita in citas
    ]
    return citas_serializadas
#FRONT

#Visualización citas veterinario
@app.get("/Veterinario/citas/", tags={"Veterinario"})
async def obtener_citas_veterinario(token: str = Depends(JWTBearer())):
    # if is_token_invalid(token):
    #      raise HTTPException(status_code=401, detail="El token ya está invalidado")
    # Decodificar el token
    usuario_username = decodeJWT(token)
    # Consulta a la base de datos
    #mycursor = db.cursor()
    mycursor = db.cursor(dictionary=True)

    mycursor.execute("""
            SELECT c.id, c.fecha, ce.nombre AS centro, m.nombre As mascota, m.especie, m.propietario FROM amep13.Cita c JOIN Centro ce ON c.idCentro=ce.id JOIN Mascota m ON m.idMascota=c.idMascota WHERE Veterinario = %s AND c.fecha >= current_date() ORDER BY c.fecha ASC;
            """, (usuario_username,))
    
    rows = mycursor.fetchall()

    # Si no se encuentra, devuelve un error
    if not rows:
        mycursor.close()
        raise HTTPException(status_code=404, detail="Citas veterinario no encontrado")
    
    #column_names = [i[0] for i in mycursor.description]
    #result_list = [dict(zip(column_names, row)) for row in rows]

    mycursor.close()

    citas_serializadas = json.loads(json.dumps(rows, default=json_serial))

    # Devuelve la información de las citas del veterinario en formato JSON

    #return JSONResponse(content=result_list, status_code=200)
    return JSONResponse(content=citas_serializadas)
