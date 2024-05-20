import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Navbar from '../../Componentes/Navbar';
import SidenavVeterinario from '../../Componentes/Sidenav/SidenavVeterinario';

export default function InicioVeterinario() {
  return (
    <>
    <Navbar/>
    <Box height={40}/>
    <Box sx={{  display: 'flex'}}>
        <SidenavVeterinario/>
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
