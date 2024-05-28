import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SidenavVeterinario from '../../Componentes/Sidenav/SidenavVeterinario';
import NavbarVet from '../../Componentes/NavbarVet';
import img5 from '../../Componentes/Assets/img5.png';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

export default function InicioVeterinario() {
  const navigate = useNavigate();
  return (
    <>
    <NavbarVet/>
    <Box height={40}/>
    <Box sx={{  display: 'flex'}}>
      <SidenavVeterinario/>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <h1>Inicio</h1>
        <Box height={20} />
        <h2 style={{ fontSize: '25px'}}>
          Bienvenido Veterinario! 
          Aquí podrás gestionar tus citas.
          Pincha en alguna tarjeta o navega 
          por el menu lateral para acceder 
          a los apartados disponibles.
          </h2>

        <Box height={100} />
        <Box sx={{ maxWidth: '60vw', margin: '0 auto' }}>
          <Grid container spacing={15}>
            <Grid item xs={12} sm={12}>
              <h2>Mis Citas</h2>
              <Card sx={{ border: '1px solid gray' }}>
                <CardActionArea                 
                onClick={() => {
                navigate("/Veterinario/Citas");
                 }}>
                  <CardMedia
                    component="img"
                    height="500"
                    image={img5}
                    alt="soporte"
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      Pincha aquí para ver un listado de tus citas.
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

        )
}
