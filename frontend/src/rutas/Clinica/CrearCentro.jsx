import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Navbar from '../../Componentes/Navbar';
import SidenavClinica from '../../Componentes/Sidenav/SidenavClinica';
import { FaHospitalUser } from 'react-icons/fa6';
import './CrearCentro.css';
import SelectAceptaEspecies from '../../Componentes/Selects/SelectAceptaEspecies';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import Alert from '@mui/material/Alert';


const BASE_URL = 'http://localhost:8000';

export default function CrearCentro() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [message, setMessage] = useState('');
  const [especiesAceptadas, setEspeciesAceptadas] = useState('');
  const [alerta, setAlert] = useState({ severity: '', message: '' });

  const registrarCentroEP = async (event) => {
    event.preventDefault();
    const token = JSON.parse(localStorage.getItem('token'));
    const accessToken = token.access_token;

    if (!nombre || !direccion || especiesAceptadas==0) {
      setAlert({ severity: 'error', message: 'Por favor, complete todos los campos.' });
      console.log(message)
      return;
    }
    // Unir los arrays de especies aceptadas en uno solo
    const especiesUnificadas = especiesAceptadas.flat();
    // console.log(especiesUnificadas)
  
    try {
      const response = await fetch(`${BASE_URL}/Clinicas/CrearCentros`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          nombre: nombre,
          direccion: direccion,
          especies: especiesUnificadas,
        }),
      });

      console.log(especiesUnificadas)


      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setNombre('');
        setDireccion('');
        alert('Centro registrado exitosamente.');
        navigate('/Clinica/MisCentros');
      } else {
        // setMessage(data.detail || 'Error al registrar el centro');
        setAlert({ severity: 'error', message: 'Error al registrar el centro' });

      }
    } catch (error) {
      console.error('Error:', error);
      setAlert({ severity: 'error', message: 'Error al registrar el centro'  });

      // setMessage('Error al registrar el centro');
    }
  };



  return (
    <>
      <Navbar />
      <Box height={80} />
      <Box sx={{ display: 'flex' }}>
        <SidenavClinica />
        <Box height={200} />
        <Box sx={{ maxWidth: 600, margin: '0 auto', alignItems: 'center' }}>
          <div className="login-formCentro">
            <div className={"wrapperCentro"}>
              <div className="form-box-loginCentro">
                <form onSubmit={registrarCentroEP}>
                <h1>Registro de Centro</h1>
                  {alerta.message && (
                    <Alert severity={alerta.severity}>{alerta.message}</Alert>
                  )}
                  <div className="input-box">
                  <input
                          type="text"
                          name="nombre"
                          placeholder="Nombre del Centro"
                          value={nombre}
                          onChange={(e) => setNombre(e.target.value)}
                          // required
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
                          // required
                        />
                        <FmdGoodIcon className="icono" />
                  </div>
                  <div className='input-box'>
                      <SelectAceptaEspecies
                         value={especiesAceptadas} 
                         onChange={(value) => setEspeciesAceptadas(value)}
                        />
                  </div>
                  <button type='submit'>Registrar centro</button>
                </form>
              </div>
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
}