import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Navbar from '../../Componentes/Navbar';
import SidenavClinica from '../../Componentes/Sidenav/SidenavClinica';
import { FaHospitalUser } from 'react-icons/fa6';
import { RiLockPasswordFill } from 'react-icons/ri';
import { IoMdMail } from 'react-icons/io';
import { FaUserAlt, FaPhoneAlt } from 'react-icons/fa';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import { FaUserAstronaut } from 'react-icons/fa6';
import '../Administrador/CrearClinica.css';
import SelectEspecieProp from '../../Componentes/Selects/SelectEspecieProp';

const BASE_URL = 'http://localhost:8000';

const CrearCentro = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [message, setMessage] = useState('');
  const [especie, setEspecie] = useState('');

  const registrarCentro = async (event) => {
    event.preventDefault();
    const token = JSON.parse(localStorage.getItem('token'));
    const accessToken = token.access_token;

    const centro = {
      nombre: nombre,
      direccion: direccion,
      especie: especie
    };

    try {
      const response = await fetch(`${BASE_URL}/Clinicas/CrearCentros`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(centro)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setNombre('');
        setDireccion('');
        alert('Centro registrado exitosamente.');
        navigate('/Clinica/MisCentros');
      } else {
        setMessage(data.detail || 'Error al registrar el centro');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error al registrar el centro');
    }
  };

  useEffect(() => {
    const getEspecies = async () => {
      const token = localStorage.getItem("token");
  
      // Construir la solicitud fetch
      const requestOptions = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          nombre: nombre,
          direccion: direccion,
          especie: especie,
        }),
      };
      console.log("Solicitud fetch:", requestOptions);
    };
  
    getEspecies();
  }, 
  []);

  return (
    <>
      <Navbar />
      <Box height={40} />
      <Box sx={{ display: 'flex' }}>
        <SidenavClinica />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Registro de Centro</h1>
          <Box height={300}>
            <Box
              sx={{
                maxWidth: 800,
                margin: '0 auto',
                alignItems: 'center',
                width: '60%',
              }}
            >
              <div style={{ height: '100%', width: '100%', minHeight: '100px' }}>
                <div className="signup-form">
                  <div className="form-box registro">
                    <form action="" onSubmit={registrarCentro}>
                      <div className="input-box">
                        <input
                          type="text"
                          name="nombre"
                          placeholder="Nombre del Centro"
                          value={nombre}
                          onChange={(e) => setNombre(e.target.value)}
                          required
                        />
                        <FaHospitalUser className="icono" />
                      </div>

                      <div className="input-box">
                        <input
                          type="text"
                          name="direccion"
                          placeholder="Dirección"
                          value={direccion}
                          onChange={(e) => setDireccion(e.target.value)}
                          required
                        />
                        <FaUserAlt className="icono" />
                      </div>

                      <div className='input-box'>
                      <SelectEspecieProp
                        value={especie} 
                        onChange={(value) => setEspecie(value)}
                        />
                      </div>

                      <button type="submit">Registrar</button>
                    </form>
                    {message && (
                      <div className="message">
                        {message}
                      </div>
                    )}
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

export default CrearCentro;
