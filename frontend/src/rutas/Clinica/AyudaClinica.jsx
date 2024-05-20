import React from 'react'
import Box from '@mui/material/Box';
import Navbar from '../../Componentes/Navbar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import soporteimg from '../../Componentes/Assets/soporteimg.png'
import '../propietario/Ayuda.css'
import SidenavClinica from '../../Componentes/Sidenav/SidenavClinica';
export default function AyudaClinica() {
  return (

    <>
    <Navbar/>
    <Box height={40}/>
    <Box sx={{  display: 'flex'}}>
      <SidenavClinica/>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <h1>Ayuda</h1>
      <Box height={300}/>
            <Box sx={{ maxWidth: 600, margin: '0 auto', alignItems: 'center' }}>
            <Card sx={{ border: '1px solid gray' }}>
                <CardActionArea onClick={() => window.location.href = 'mailto:juan.cifuentes.orozco@estudiantat.upc.edu'}>
                  <CardMedia
                    component="img"
                    height="400"
                    image={soporteimg}
                    alt="soporte"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Ayuda
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Pincha aquí para enviar un correo a soporte.
                    </Typography>
                  </CardContent>
                </CardActionArea>
            </Card>
            </Box>
          </Box>
    </Box>
    </>

  )
}
