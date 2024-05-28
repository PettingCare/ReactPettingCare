import React from 'react'
import Sidenav from '../../Componentes/Sidenav/Sidenav'
import Box from '@mui/material/Box';
import Navbar from '../../Componentes/Navbar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import img1 from '../../Componentes/Assets/img1.png';
import img2 from '../../Componentes/Assets/img2.png';
import img3 from '../../Componentes/Assets/img3.png';
import img4 from '../../Componentes/Assets/img4.png';

import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
export default function Inicio() {

  const navigate = useNavigate();

  return (
    <>
    <Navbar />
    <Box height={40} />
    <Box sx={{ display: 'flex' }}>
      <Sidenav />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <h1>Inicio</h1>
        <Box height={20} />
        <h2 style={{ fontSize: '25px'}}>
          Bienvenido Propietario! 
          Aquí podrás gestionar tus mascotas,
          Pincha en alguna tarjeta o navega 
          por el menu lateral para acceder 
          a los apartados disponibles.
          </h2>

        <Box height={100} />
        <Box sx={{ maxWidth: '60vw', margin: '0 auto' }}>
          <Grid container spacing={15}>
            <Grid item xs={12} sm={6}>
              <h2>Mis Mascotas</h2>
              <Card sx={{ border: '1px solid gray' }}>
                <CardActionArea                 
                onClick={() => {
                navigate("/Mascotas");
                 }}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={img1}
                    alt="soporte"
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      Pincha aquí para ver un listado de tus mascotas.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
             <h2>Nueva Mascota</h2>
              <Card sx={{ border: '1px solid gray' }}>
                <CardActionArea                 
                onClick={() => {
                navigate("/CrearMascota");
                 }}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={img2}
                    alt="soporte"
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      Pincha aquí para registrar una nueva mascota.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
            <h2>Mis citas</h2>
              <Card sx={{ border: '1px solid gray' }}>
                <CardActionArea                 
                onClick={() => {
                navigate("/Citas");
                }}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={img3}
                    alt="soporte"
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      Pincha aquí para ver un listado de tus citas pendientes.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
            <h2>Nueva Cita</h2>
              <Card sx={{ border: '1px solid gray' }}>
                <CardActionArea                 
                onClick={() => {
                navigate("/CrearCita");
                }}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={img4}
                    alt="soporte"
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      Pincha aquí para agendar una nueva cita.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  </>
);
}
