import React from 'react'
import Sidenav from '../../Componentes/Sidenav/Sidenav'
import Box from '@mui/material/Box';
import Navbar from '../../Componentes/Navbar';
import TablaMascotas from '../../Componentes/Tablas/TablaMascotas';

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
        <Box height={75}/>
          <Box sx={{ margin: '0 auto', alignItems: 'center', width: '100%'}}>
            <TablaMascotas/>
          </Box>
        </Box>
      </Box>
    </>
  )
}
