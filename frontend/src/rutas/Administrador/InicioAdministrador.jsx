import React from 'react'
import Box from '@mui/material/Box';
import Navbar from '../../Componentes/Navbar';
import SidenavAdministrador from '../../Componentes/Sidenav/SidenavAdministrador';

export default function InicioAdministrador() {
  return (
    <>
    <Navbar/>
    <Box height={40}/>
    <Box sx={{  display: 'flex'}}>
        <SidenavAdministrador/>
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
