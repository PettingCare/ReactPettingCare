import React, { useRef, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Navbar from '../../Componentes/Navbar';
import SidenavClinica from '../../Componentes/Sidenav/SidenavClinica';

const BASE_URL = 'http://localhost:8000';

const ListadoVeterinarios = () => {
  const [rows, setRows] = useState([])
  const columns = [
    {
      field: 'nombre',
      headerName: 'Nombre',
      width: 120
    },
    {
      field: 'apellidos',
      headerName: 'Apellidos',
      width: 150
    },
    {
      field: 'username',
      headerName: 'Username',
      width: 100
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200
    },
    {
      field: 'telefono',
      headerName: 'Teléfono',
      width: 110
    },
    {
      field: 'centro',
      headerName: 'Centro',
      width: 150
    }
  ];
  useEffect(() => {
    const getVeterinarios = async (event) => {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const accessToken = token.access_token;
        const response = await fetch(`${BASE_URL}/Clinicas/Veterinarios`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${accessToken}`
          }
        })
        if (response.ok) {
          const data = await response.json()
          console.log(data)
          setRows(data)
        }
      } catch (error) {
        console.error(error)
      }
    }
    getVeterinarios()
    return () => rows
  }, [])
  return (
    <>
    <Navbar/>
    <Box height={40}/>
    <Box sx={{  display: 'flex'}}>
      <SidenavClinica/>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <h1>Listado de Veterinarios</h1>
        <Box height={300}>
          <Box sx={{ maxWidth: 1000, margin: '0 auto', alignItems: 'center', width: '60%'}}>
            <div style={{ height: '100%', width: '100%', minHeight:'100px' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                getRowId={(row) => row.username}
                rowsPerPageOptions={[10]}
              />
            </div>
          </Box>
        </Box>
      </Box>
    </Box>
    </>
  )
}

export default ListadoVeterinarios;