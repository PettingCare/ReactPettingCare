import React from 'react'
import Sidenav from '../../Componentes/Sidenav/Sidenav'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Navbar from '../../Componentes/Navbar';

export default function Inicio() {
  return (
    <>
    <Navbar/>
    <Box height={40}/>
    <Box sx={{  display: 'flex'}}>
        <Sidenav/>
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
