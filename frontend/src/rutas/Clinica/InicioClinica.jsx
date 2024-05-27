import React from 'react'
import Box from '@mui/material/Box';
import Navbar from '../../Componentes/Navbar';
import SidenavClinica from '../../Componentes/Sidenav/SidenavClinica';

export default function InicioClinica() {
  return (
    <>
    <Navbar/>
    <Box height={40}/>
    <Box sx={{  display: 'flex'}}>
        <SidenavClinica/>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <h1>Inicio</h1>
        <Box height={300}/>
              <Box sx={{ maxWidth: 600, margin: '0 auto', alignItems: 'center' }}>
              </Box>
      </Box>
    </Box>
    </>

  )
}
