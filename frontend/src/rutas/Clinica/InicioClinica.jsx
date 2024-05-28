import React from 'react';
import Box from '@mui/material/Box';
import Navbar from '../../Componentes/Navbar';
import SidenavClinica from '../../Componentes/Sidenav/SidenavClinica';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import soporteimg from '../../Componentes/Assets/soporteimg.png';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import imgMisCentros from '../../Componentes/Assets/imgMisCentros.png'
import imgNuevoCentro from '../../Componentes/Assets/imgNuevoCentro.png'
import imgListadoVeterinarios from '../../Componentes/Assets/imgListadoVeterinarios.png'
import imgNuevoVeterinario from '../../Componentes/Assets/imgNuevoVeterinario.png'


export default function InicioClinica()  {

  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <Box height={40} />
      <Box sx={{ display: 'flex' }}>
        <SidenavClinica />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Inicio</h1>
          <Box height={20} />
          <h2 style={{ fontSize: '25px'}}>
            Bienvenido Gerente! 
            Aquí podrás gestionar tus clinicas,
            Pincha en alguna tarjeta o navega 
            por el menu lateral para acceder 
            a los apartados disponibles.
            </h2>

          <Box height={100} />
          <Box sx={{ maxWidth: '60vw', margin: '0 auto' }}>
            <Grid container spacing={15}>
              <Grid item xs={12} sm={6}>
                <h2>Mis Centros</h2>
                <Card sx={{ border: '1px solid gray' }}>
                  <CardActionArea                 
                  onClick={() => {
                  navigate("/Clinica/MisCentros");
                   }}>
                    <CardMedia
                      component="img"
                      height="300"
                      image={imgMisCentros}
                      alt="soporte"
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        Pincha aquí para ver un listado de tus centros.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
               <h2>Nuevo Centro</h2>
                <Card sx={{ border: '1px solid gray' }}>
                  <CardActionArea                 
                  onClick={() => {
                  navigate("/Clinica/CrearCentro");
                   }}>
                    <CardMedia
                      component="img"
                      height="300"
                      image={imgNuevoCentro}
                      alt="soporte"
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        Pincha aquí para registrar un nuevo centro.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
              <h2>Listado Veterinarios</h2>
                <Card sx={{ border: '1px solid gray' }}>
                  <CardActionArea                 
                  onClick={() => {
                  navigate("/Clinica/Veterinarios");
                  }}>
                    <CardMedia
                      component="img"
                      height="300"
                      image={imgListadoVeterinarios}
                      alt="soporte"
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        Pincha aquí para ver un listado de los veterinarios asociados a tus centros.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
              <h2>Nuevo Veterinario</h2>
                <Card sx={{ border: '1px solid gray' }}>
                  <CardActionArea                 
                  onClick={() => {
                  navigate("/Clinica/:clinicaId/crear-veterinario");
                  }}>
                    <CardMedia
                      component="img"
                      height="300"
                      image={imgNuevoVeterinario}
                      alt="soporte"
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        Pincha aquí para registrar un nuevo veterinario.
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
