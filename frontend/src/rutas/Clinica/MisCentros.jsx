import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Navbar from '../../Componentes/Navbar';
import SidenavClinica from '../../Componentes/Sidenav/SidenavClinica';

const BASE_URL = 'http://localhost:8000';

export default function MisCentros() {
  const [rows, setRows] = useState([])
  const columns = [
    {
      field: 'nombre',
      headerName: 'Nombre',
      width: 660
    },
    {
      field: 'direccion',
      headerName: 'Direccion',
      width: 660
    }
  ];
  useEffect(() => {
    const getCentros = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const accessToken = token.access_token;

        const response = await fetch(`${BASE_URL}/Clinicas/Centros`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
          }
        });
        if(response.ok){
          const data = await response.json();
          console.log(data);
          setRows(data);
        }else{
          console('Error al obtener los datos',response.statusText);
        }
      } catch (error) {
        console.log('Error',error)
      }
    };

    getCentros()
  }, []);
  return (
    <>
    <Navbar/>
    <Box height={40}/>
    <Box sx={{  display: 'flex'}}>
      <SidenavClinica/>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <h1>Mis Centros</h1>
      <Box height={75}/>
            <Box sx={{ maxWidth: '60vw', margin: '0 auto', alignItems: 'center',width: '60%' }}>
            <div style={{ height: '100%', width: '100%', minHeight:'100px' }}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    rowsPerPageOptions={[10]}
                  />
                </div>
            </Box>
          </Box>
    </Box>
    </>

  )
}