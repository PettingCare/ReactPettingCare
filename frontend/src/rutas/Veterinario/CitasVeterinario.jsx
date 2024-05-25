import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';

import Grid from '@mui/material/Unstable_Grid2';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import SidenavVeterinario from '../../Componentes/Sidenav/SidenavVeterinario';
import NavbarVet from '../../Componentes/NavbarVet';
import './CitasVeterinario.css';


export default function CitasVeterinario() {

  const BASE_URL = 'http://localhost:8000';
  const [citas, setCitas] = useState([]);
  /*const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCitasVeterinario = async () => {
      const token = JSON.parse(localStorage.getItem("token"));
      const accessToken = token.access_token;
      console.log(accessToken);
      try {
        const response = await fetch(`${BASE_URL}/Veterinario/citas/`, {
          method: 'GET',
          headers: {
            "Authorization": `Bearer ${accessToken}`
          },
        });

        if (!response.ok) {
          throw new Error('No se pudo obtener información');
        }
        const data = await response.json();
        console.log(data);
        setCitas(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    getCitasVeterinario();

  }, []);

  if (loading) return <p>Cargando...</p>
  if (loading) return <p>Error: {error.message}</p>
*/

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const accessToken = token.access_token;
    console.log(accessToken);

    fetch(`${BASE_URL}/Veterinario/citas/`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${accessToken}`
      },
    })
      .then(response => response.json())
      .then(data => setCitas(data))
      .catch(error => console.error('Error: ', error));

  }, []);

  return (
    <>

      <NavbarVet />
      <Box height={40} />
      <Box sx={{ display: 'flex' }}>
        <SidenavVeterinario />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Citas</h1>

          <div className='grid-citas'>
            {citas.map(cita => (
              <div key={cita.id}>
                <h3>{cita.fecha}</h3>
                <p className='citas-info'>Tiene una cita con {cita.mascota} de {cita.propietario} el {cita.fecha} en {cita.centro}.</p>
                <p><span>Nombre mascota:</span> {cita.mascota}</p>
                <p><span>Nombre del propietario:</span> {cita.propietario}</p>
                <p><span>Especie:</span> {cita.especie}</p>
                <p><span>Centro:</span> {cita.centro}</p>
              </div>
            ))}
          </div>
        </Box>
      </Box>

    </>

  )
}
