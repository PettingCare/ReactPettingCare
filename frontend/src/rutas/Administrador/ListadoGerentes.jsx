import React, { useRef, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Navbar from '../../Componentes/Navbar';
import SidenavAdministrador from '../../Componentes/Sidenav/SidenavAdministrador';

const BASE_URL = 'http://localhost:8000';

const ListadoGerentes = () => {
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
      width: 200
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
    }
  ];
  useEffect(() => {
    const getGerentes = async (event) => {
      try {
        const response = await fetch(`${BASE_URL}/Gerentes`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        if (response.ok) {
          const data = await response.json()
          console.log(data)
          setRows(data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getGerentes()
    return () => rows
  }, []);
  return (
    <>
    <Navbar/>
    <Box height={40}/>
    <Box sx={{  display: 'flex'}}>
        <SidenavAdministrador/>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <h1>Listado de Gerentes</h1>
        <Box height={300}>
          <Box sx={{ maxWidth: 800, margin: '0 auto', alignItems: 'center', width: '60%'}}>
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
export default ListadoGerentes;