import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Sidenav from '../../Componentes/Sidenav/Sidenav';
import Navbar from '../../Componentes/Navbar';

export default function MiPerfil() {


  const BASE_URL = 'http://localhost:8000';
  const [especies, setEspecies] = useState([]);

  useEffect(() => {
    const getPerfil = async () => {
      const token = JSON.parse(localStorage.getItem("token"));
      const accessToken = token.access_token;
      console.log(accessToken);
      try {
        const response = await fetch(`${BASE_URL}/perfil`, {
          method: 'GET',
          headers: {
            "Authorization": `Bearer ${accessToken}`
          }, 
        });
        
        if (!response.ok) {
          throw new Error('No se pudo obtener informacion');
        }
        const data = await response.json();
        console.log(data)
      } catch (error) {
        console.error('Error al obtener mi perfil:', error);
      }
    };

    getPerfil();
  }, []);

  return (
    <>
    <Navbar/>
    <Box height={40}/>
    <Box sx={{  display: 'flex'}}>
      <Sidenav/>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <h1>Mi perfil</h1>
      <Box height={300}/>
            <Box sx={{ maxWidth: 600, margin: '0 auto', alignItems: 'center' }}>
            </Box>
          </Box>
    </Box>
    </>
  );
}
