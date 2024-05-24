import React, { useEffect, useState } from "react";
import { FaHospitalUser } from "react-icons/fa6";
import { RiLockPasswordFill  } from "react-icons/ri";
import { IoMdMail } from "react-icons/io";
import { FaUserAlt,FaPhoneAlt } from "react-icons/fa";
import { IoIosEye, IoIosEyeOff  } from "react-icons/io";
import { FaUserAstronaut } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Navbar from '../../Componentes/Navbar';
import SidenavClinica from '../../Componentes/Sidenav/SidenavClinica';
import '../Administrador/CrearClinica.css'

const BASE_URL = "http://localhost:8000";

const CrearVeterinario = () => 
{
  const navigate = useNavigate();
  const [centros, setCentros] = useState([])

  useEffect(() => {
    const getCentros = async (event) => {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const accessToken = token.access_token;

        const response = await fetch(`${BASE_URL}/Clinicas/Centros`, {
          method: 'GET',
          headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
          }
        })
        if (response.ok) {
          const data = await response.json()
          console.log(data)
          setCentros(data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getCentros()
  }, [])
  const registrarVeterinario = async(event) => {
    event.preventDefault();
    const {centro, nombre, apellidos, email, password, username, telefono} = event.target.elements;
    console.log(centro.value)
    const param = new URLSearchParams({centro: centro.value})
  
    // console.log(nombre.value)
    // console.log(gerente.options[gerente.selectedIndex].value)
    try {
      const response = await fetch(`${BASE_URL}/veterinario/registro?` + param, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre: nombre.value,
          apellidos: apellidos.value,
          email:email.value ,
          password: password.value,
          username: username.value,
          telefono: telefono.value
        })
      });
      if (response.ok) {
        alert('Veterinario registrado exitosamente.')
        navigate('/Clinica/Veterinarios')
      }
    } catch (error) {
      console.log(error)
    }
  }

  /*toggle para pinchar en el ojo y que enseñe la contraseña*/
  const [passwordVisible, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!passwordVisible);
  }
  // Prueba validar movil, 9 digitos
  const [telefono, settelefono] = useState("");
  const [isError, setIsError] = useState(false);
  const pattern = new RegExp(/^\d{9}$/);

  return (
    <>
      <Navbar />
      <Box height={40} />
      <Box sx={{ display: "flex" }}>
        <SidenavClinica />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Registro de Veterinario</h1>
          <Box height={300}>
            <Box
              sx={{
                maxWidth: 800,
                margin: "0 auto",
                alignItems: "center",
                width: "60%",
              }}
            >
              <div
                style={{ height: "100%", width: "100%", minHeight: "100px" }}
              >
                <div className="signup-form">
                  <div className="form-box registro">
                    <form action="" onSubmit={registrarVeterinario}>

                    <div className="input-box">
                        <div className='centro'>
                          <label>Centro</label>
                          <select className='selectCentro' name='centro' >
                            { centros.map((e, key) => {
                              return (
                                <option key={key} value={e.id}>
                                  {e.nombre}
                                </option>
                              )
                            })}
                          </select>
                        </div>
                      </div>
                      <div className="input-box">
                        <input
                          type="text"
                          name="nombre"
                          placeholder="Nombre"
                          required
                        />
                        <FaHospitalUser className="icono" />
                      </div>

                      <div className="input-box">
                        <input
                          type="text"
                          name="apellidos"
                          placeholder="Apellidos"
                          required
                        />
                        <FaUserAlt className="icono" />
                      </div>

                      <div className="input-box">
                        <input
                          type="email"
                          name="email"
                          placeholder="Correo electrónico"
                          required
                        />
                        <IoMdMail className="icono" />
                      </div>
                      <div className="input-box">
                        <input
                          type={passwordVisible ? "text" : "password"}
                          name="password"
                          placeholder="Contraseña"
                          required
                        />
                        <RiLockPasswordFill className="icono" />
                        {passwordVisible ? (
                          <IoIosEye
                            className="showPass"
                            onClick={togglePasswordVisibility}
                          />
                        ) : (
                          <IoIosEyeOff
                            className="showPass"
                            onClick={togglePasswordVisibility}
                          />
                        )}
                      </div>
                      <div className="input-box">
                        <input
                          type="text"
                          name="username"
                          placeholder="Username"
                          required
                        />
                        <FaUserAstronaut className="icono" />
                      </div>
                      <div className="input-box">
                        <input
                          value={telefono}
                          type="number"
                          name="telefono"
                          placeholder="Telefono"
                          onChange={(e) => {
                            settelefono(e.target.value);
                            if (!pattern.test(e.target.value)) setIsError(true);
                            else setIsError(false);
                          }}
                          required
                        />
                        <FaPhoneAlt className="icono" />
                        <h6>
                          Tu numero es:
                          {isError ? "Numero incorrecto" : "+34 " + telefono}
                        </h6>
                      </div>
                      <button type="submit">Registrar</button>
                    </form>
                  </div>
                </div>
              </div>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default CrearVeterinario;