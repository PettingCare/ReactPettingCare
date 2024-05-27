import React, { useState, useEffect } from 'react';
import './CrearMascota.css';
import Sidenav from '../../Componentes/Sidenav/Sidenav';
import Box from '@mui/material/Box';
import Navbar from '../../Componentes/Navbar';
import { useNavigate } from 'react-router-dom';
import MascotaDatepicker from '../../Componentes/Datepickers/MascotaDatepicker';
import SelectEspecieProp from '../../Componentes/Selects/SelectEspecieProp';
import Alert from '@mui/material/Alert';

import { LuDog } from "react-icons/lu";

export default function CrearMascota() {
  const BASE_URL = 'http://localhost:8000';
  const navigate = useNavigate();

  const [nombreMascota, setNombreMascota] = useState('');
  const [fNacimiento, setFNacimiento] = useState('');
  const [especie, setEspecie] = useState('');

  const [alerta, setAlert] = useState({ severity: '', message: '' });


  const registroMascotaEP = async (event) => {
    event.preventDefault();
    if (!nombreMascota || !fNacimiento || !especie) {
      setAlert({ severity: 'error', message: 'Por favor, complete todos los campos.' });
      return;
    }
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const accessToken = token.access_token;
      console.log(accessToken);

      let fechaMascota=(fNacimiento).toDate();
      console.log(fechaMascota)

      const response = await fetch(`${BASE_URL}/mascotas/registro`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          nombre: nombreMascota,
          fechaNacimiento: fechaMascota,
          especie: especie[0],
        }),
      });
      const data = await response.json();
      if (response.ok && data.message !== "No se ha podido registrar. Ya existe una mascota con el nombre que indicaste") {
        console.log('Mascota registrada exitosamente:', data);
        alert('Mascota registrada exitosamente');
        navigate("/Mascotas");
      } else {
        console.error('Error al registrar mascota:', data.message);
        setAlert({ severity: 'error', message: data.message });
        // alert(data.message);
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
        nombre: nombreMascota,
        fechaNacimiento: fNacimiento,
        especie: especie,
      }),
    };
    console.log("Solicitud fetch:", requestOptions);
  };

  getEspecies();
}, 
// eslint-disable-next-line
[]);

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
                <form onSubmit={registroMascotaEP}>
                  <h1>Nueva Mascota</h1>
                  {alerta.message && (
                    <Alert severity={alerta.severity}>{alerta.message}</Alert>
                  )}
                  <div className="input-boxMascota">
                    <input
                      type="text"
                      name="nombreMascota"
                      placeholder='Nombre mascota'
                      value={nombreMascota}
                      onChange={(e) => setNombreMascota(e.target.value)}
                      // required
                    />
                    <LuDog className='iconoMascota' />
                  </div>
                  <div className="input-nacimiento">
                    <MascotaDatepicker
                      value={fNacimiento}
                      onChange={(date) => setFNacimiento(date)}
                    />
                  </div>
                  <div className="input-nacimiento">
                  <SelectEspecieProp
                  value={especie} 
                  onChange={(value) => setEspecie(value)}
                  />
                  </div> 
                  <button type='submit'>Registrar mascota</button>
                </form>
              </div>
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
}
