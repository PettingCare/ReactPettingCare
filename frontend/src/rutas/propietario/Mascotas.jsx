import React from 'react'
import Sidenav from '../../Componentes/Sidenav/Sidenav'
import Box from '@mui/material/Box';
import Navbar from '../../Componentes/Navbar';
import TablaCitas from '../../Componentes/Tablas/TablaCitas';

export default function Mascotas() {
  /*
  Codigo backend en JavaScript
  */
  return (
    <>
    <Navbar/>
    <Box height={40}/>
    <Box sx={{  display: 'flex'}}>
        <Sidenav/>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <h1>Mascotas</h1>
        <Box height={300}>
          <Box sx={{ maxWidth: 800, margin: '0 auto', alignItems: 'center', width: '60%'}}>
            <TablaCitas/>
          </Box>
        </Box>
      </Box>
    </Box>
    </>
  )
}
