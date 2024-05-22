import React from 'react'
import Sidenav from '../../Componentes/Sidenav/Sidenav'
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

export default function Citas() {
  return (
    <>
    <Navbar/>
    <Box height={40}/>
    <Box sx={{ display: 'flex' }}>
      <Sidenav/>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <h1>Citas</h1>
      <Box height={40}/>
      
      </Box>
    </Box>
    </>

  )
}
