import React from 'react'
import Box from '@mui/material/Box';
import Navbar from '../../Componentes/Navbar';

import Grid from '@mui/material/Unstable_Grid2';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import SidenavVeterinario from '../../Componentes/Sidenav/SidenavVeterinario';

export default function CitasVeterinario() {
  return (
    <>
    <Navbar/>
    <Box height={40}/>
    <Box sx={{ display: 'flex' }}>
      <SidenavVeterinario/>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <h1>Citas</h1>
      <Box height={40}/>
      <Grid container spacing={2} >
          <Grid xs={8}>
            <Stack direction="row" spacing={2}>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Prueba1
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over 6,000
                  species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions>
                <Switch/>
              </CardActions>
            </Card>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Prueba2
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over 6,000
                  species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions>
              </CardActions>
            </Card>
            </Stack>
          </Grid>
          <Grid xs={4}>

          </Grid>
        </Grid>
      {/* Grid 1, con 2 cards */}
        <Grid container spacing={2}>
          <Grid xs={8}>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                Prueba3
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over 6,000
                  species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions>
              </CardActions>
            </Card>
          </Grid>
          <Grid xs={4}>
          </Grid>
        </Grid>
      </Box>
    </Box>
    </>

  )
}
