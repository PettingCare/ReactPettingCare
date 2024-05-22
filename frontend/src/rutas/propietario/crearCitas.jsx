import React, { useState, useEffect } from 'react';
import './CrearMascota.css';
import Sidenav from '../../Componentes/Sidenav/Sidenav';
import Box from '@mui/material/Box';
import Navbar from '../../Componentes/Navbar';
import { IoMdMail } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import MascotaDatepicker from '../../Componentes/Datepickers/MascotaDatepicker';
import SelectEspecieProp from '../../Componentes/Selects/SelectEspecieProp';
import { LuDog } from "react-icons/lu";
import dayjs from 'dayjs';

export default function CrearCitas() {
  const BASE_URL = 'http://localhost:8000';
  const navigate = useNavigate();

  const [motivoCita, setMotivoCitas] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');



// POST CORRECTO, DESCOMENTAR AL HACER EL ARREGLO
  const nuevaCitaEP = async (event) => {
    event.preventDefault();
    if (!motivoCita || !fecha || !hora) {
      console.error('Por favor, complete todos los campos.');
      return;
    }
    try {
      // const token = JSON.parse(localStorage.getItem("token"));
      const token = JSON.parse(localStorage.getItem("token"));
      const accessToken = token.access_token;
      console.log(accessToken);

      let fechaMascota=(fecha).toDate();
      console.log(fechaMascota)
                                                //mascotas
      const response = await fetch(`${BASE_URL}/citas /registro`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          nombre : motivoCita,
          fechaCita: fecha,
          horaCita: hora[0],
          
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Cita registrada exitosamente:', data);
        navigate("/Citas");
      } else {
        console.error('Error al registrar la cita:', data.message);
      }
    } catch (error) {
      console.error('Error al enviar solicitud:', error);
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
          motivo: motivoCita,
          fechaCita: fecha,
          horaCita: hora,
      }),
    };
    console.log("Solicitud fetch:", requestOptions);
  };

  getEspecies();
}, []);

  return (
    <>
      <Navbar />
      <Box height={80} />
      <Box sx={{ display: 'flex' }}>
        <Sidenav />
        <Box height={200} />
        <Box sx={{ maxWidth: 600, margin: '0 auto', alignItems: 'center' }}>
          <div className="login-formMascota">
            <div className={"wrapperMascota"}>
              <div className="form-box loginMascota">
                <form onSubmit={nuevaCitaEP}>
                  <h1>Nueva Cita</h1>
                  <div className="input-boxMascota">
                    <input
                      type="text"
                      name="motivoCita"
                      placeholder='Motivo Cita'
                      value={motivoCita}
                      // onChange={(e) => setMotivoCita(e.target.value)}
                      required
                    />
                    <LuDog className='iconoMascota' />
                  </div>
                  <div className="input-nacimiento">
                    <MascotaDatepicker
                      value={fecha}
                      onChange={(date) => setFecha(date)}
                    />
                  </div>
                  <div className="input-nacimiento">
                  <SelectEspecieProp
                  value={hora} 
                  onChange={(value) => setHora(value)}
                  />
                  </div> 
                  <button type='submit'>Registrar cita</button>
                </form>
              </div>
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
}
