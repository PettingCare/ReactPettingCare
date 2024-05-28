import React from 'react'
import Box from '@mui/material/Box';
import Navbar from '../../Componentes/Navbar';
import SidenavAdministrador from '../../Componentes/Sidenav/SidenavAdministrador';
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
import imgListadoGerentes from '../../Componentes/Assets/imgListadoGerentes.png'
import imgNuevoGerente from '../../Componentes/Assets/imgNuevoGerente.png'


export default function InicioAdministrador() {

  const navigate = useNavigate();

  return (
    <>
    <Navbar/>
    <Box height={40}/>
    <Box sx={{  display: 'flex'}}>
        <SidenavAdministrador/>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Inicio</h1>
          <Box height={20} />
          <h2 style={{ fontSize: '25px'}}>
            Bienvenido Administrador! 
            Aquí podrás gestionar las clínicas,
            pincha en alguna tarjeta o navega 
            por el menu lateral para acceder 
            a los apartados disponibles.
            </h2>

          <Box height={100} />
          <Box sx={{ maxWidth: '60vw', margin: '0 auto' }}>
            <Grid container spacing={15}>
              <Grid item xs={12} sm={6}>
                <h2>Listado de clínicas</h2>
                <Card sx={{ border: '1px solid gray' }}>
                  <CardActionArea                 
                  onClick={() => {
                  navigate("/admin/Clinicas");
                   }}>
                    <CardMedia
                      component="img"
                      height="300"
                      image={imgMisCentros}
                      alt="soporte"
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        Pincha aquí para ver un listado de clínicas.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
               <h2>Nueva clínica</h2>
                <Card sx={{ border: '1px solid gray' }}>
                  <CardActionArea                 
                  onClick={() => {
                  navigate("/admin/CrearClinica");
                   }}>
                    <CardMedia
                      component="img"
                      height="300"
                      image={imgNuevoCentro}
                      alt="soporte"
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        Pincha aquí para registrar un nueva clínica.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
              <h2>Listado de gerentes</h2>
                <Card sx={{ border: '1px solid gray' }}>
                  <CardActionArea                 
                  onClick={() => {
                  navigate("/admin/Gerentes");
                  }}>
                    <CardMedia
                      component="img"
                      height="300"
                      image={imgListadoGerentes}
                      alt="soporte"
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        Pincha aquí para ver un listado de los gerentes asociados a las clínicas.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
              <h2>Nuevo Gerente</h2>
                <Card sx={{ border: '1px solid gray' }}>
                  <CardActionArea                 
                  onClick={() => {
                  navigate("/admin/CrearGerente");
                  }}>
                    <CardMedia
                      component="img"
                      height="300"
                      image={imgNuevoGerente}
                      alt="soporte"
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        Pincha aquí para registrar un nuevo gerente.
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
