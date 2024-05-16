import React, { useState, useEffect  } from 'react';
import './LoginRegistro.css'
import { RiLockPasswordFill  } from "react-icons/ri";
import { IoMdMail } from "react-icons/io";
import { FaUserAlt,FaPhoneAlt } from "react-icons/fa";
import { IoIosEye, IoIosEyeOff  } from "react-icons/io";
import { FaUserAstronaut } from "react-icons/fa6";
import logo from "../Assets/PC_logo.png"
import {  useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
// URL base del backend
const BASE_URL = 'http://localhost:3000';

const LoginRegistro = () => {

  /*Para cambiar la pantalla entre el inicio de sesion y el registro */
  const [action,setAction]= useState('');

  const registrarse = () => {
    setAction(' active')
  }

  const login = () => {
    setAction('')
  }

  const navigate = useNavigate(); // Obtiene el objeto history para navegar entre rutas
  /*toggle para pinchar en el ojo y que enseñe la contraseña*/
  const [passwordVisible, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!passwordVisible);
  }

  useEffect(() => {
    // Verificar si hay un token guardado al cargar la página
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      console.log('Sesión iniciada. Redireccionando a la página de inicio...');
      navigate('/Inicio');
    } else {
      console.log('Sesión NO iniciada.');
    }
  }, []);

  // Fetch Login
  const loginEP = async (event) => {
    event.preventDefault();
    const { username, password } = event.target.elements;
    if (!username || !password) {

      console.error('No se pueden encontrar los campos de correo electrónico o contraseña');
      return;
    }
    const response = await fetch(`${BASE_URL}/usuarios/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      // Inicio de sesión exitoso, guardar token en local storage
      localStorage.setItem("token", JSON.stringify(data.token));

      console.log('token sin almacenar:', data.token);
      console.log('token almacenado:',localStorage.getItem("token"));
      // Obtener y usar el token
      const storedToken = JSON.parse(localStorage.getItem("token"));
      console.log('token almacenado 2:', storedToken);
      // Redirigir al usuario a otra ruta
      console.log('Sesión iniciada. Redireccionando a la página de inicio...');
      navigate("/Inicio"); // enviamos al incio
    } else {
      // Manejar error de inicio de sesión
      console.error('Error al iniciar sesión:', data.message);
    }
  };

  // Fetch registro
  const registrarseEP = async (event) => {
    event.preventDefault();
    // Obtener los valores de los campos del formulario
    const { nombre, apellidos, email, password,username,telefono } = event.target.elements;
    if (!nombre || !apellidos||!email || !password||!username || !telefono) {
      console.error('No se pueden encontrar los campos necesarios para el registro');
      return;
    }
    // Hacer la solicitud de registro al backend
    try {
      const response = await fetch(`${BASE_URL}/usuarios/registro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: nombre.value,
          apellidos: apellidos.value,
          email:email.value ,
          password: password.value,
          username: username.value,
          telefono: telefono.value
          }),
      });

      // Verificar el estado de la respuesta
      if (response.ok) {
        // Registro exitoso
        console.log('Registro exitoso');
        window.location.reload();// enviamos al login nuevamente
      } else {

        const errorData = await response.json();
        console.error('Error en el registro:', errorData.message);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud de registro:', error);
    }
  };

// Prueba validar movil, 9 digitos
  const [telefono, settelefono] = useState("");
  const [isError, setIsError] = useState(false);
  const pattern = new RegExp(/^\d{9}$/);

  return (
    <div className="login-form">
      <img src={logo} alt="Logo Petting care" className="logo" />

      <div className={`wrapper${action}`}>
        <div className="form-box login">
          <form action="" onSubmit={loginEP}>
            <h1>Iniciar sesion</h1>
            <div className="input-box">
              <input type="text" name="username" placeholder='username' required />
              <IoMdMail  className='icono'/>
            </div>
            <div className="input-box">
              <input type={passwordVisible ? 'text' : 'password'} name="password" placeholder='Contraseña' required />
              <RiLockPasswordFill  className='icono'/>
              {passwordVisible ? <IoIosEye className='showPass' onClick={togglePasswordVisibility}/>
              : <IoIosEyeOff className='showPass' onClick={togglePasswordVisibility}/>}
            </div>
            <div className="recordar-olvidada">
              <label><input type="checkbox" />Recordar contraseña</label>
              <a href="#">Contraseña olvidada?</a>
            </div>
            <button type='submit'>Login</button>
                  {/* Alerta de error */}

            <div className="registro-link">
              <p>¿No tienes cuenta? <a href="#" onClick={registrarse}>Crear cuenta</a></p>
            </div>
          </form>
        </div>


        <div className="form-box registro">
          <form action="" onSubmit={registrarseEP}>
            <h1>Registro</h1>
            <div className="input-box">
            <input type="text" name="nombre" placeholder='Nombre' required />
              <FaUserAlt  className='icono'/>
            </div>
            <div className="input-box">
            <input type="text" name="apellidos" placeholder='Apellidos' required />
              <FaUserAlt  className='icono'/>
            </div>

            <div className="input-box">
              <input type="email" name="email" placeholder='Correo electronico' required />
              <IoMdMail  className='icono'/>
            </div>
            <div className="input-box">
            <input type={passwordVisible ? 'text' : 'password'} name="password" placeholder='Contraseña' required />
              <RiLockPasswordFill  className='icono'/>
              {passwordVisible ? <IoIosEye className='showPass' onClick={togglePasswordVisibility}/>
              : <IoIosEyeOff className='showPass' onClick={togglePasswordVisibility}/>}
            </div>
            <div className="input-box">
              <input type="text" name="username" placeholder='Username' required />
              <FaUserAstronaut  className='icono'/>
            </div>

            <div className="input-box">
              <input
                value={telefono}
                type="number"
                name="telefono"
                placeholder="Telefono"
                onChange={(e) => {
                    settelefono(e.target.value);
                    if (!pattern.test(e.target.value))
                        setIsError(true);
                    else setIsError(false);
                }}
                required
              />
              <FaPhoneAlt  className='icono'/>
              <h6>
                Tu numero es:
                {isError ? "Numero incorrecto" : "+34 " + telefono}
              </h6>


            </div>
            <button type='submit'>Registrarse</button>

            <div className="registro-link">
              <p>Ya tienes cuenta? <a href="#"onClick={login}>Inicia sesion</a></p>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
};

export default LoginRegistro

