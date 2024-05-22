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
    return (
        <>
        <Navbar/>
        <Box height={40}/>
        <Box sx={{  display: 'flex'}}>
          <SidenavClinica/>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <h1>Listado de Veterinarios</h1>
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

export default ListadoVeterinarios;