import React, { useRef, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Navbar from '../../Componentes/Navbar';
import SidenavAdministrador from '../../Componentes/Sidenav/SidenavAdministrador';

const BASE_URL = 'http://localhost:8000';

const ListadoClinicas = () => {
    const [rows, setRows] = useState([])

    const columns = [
      {
        field: 'id',
        headerName: 'ID',
        width: 70
      },
      {
        field: 'nombre',
        headerName: 'Nombre',
        width: 250
      },
      {
        field: 'Gerente',
        headerName: 'Gerente',
        width: 200
      }
    ];
    useEffect(() => {
      const getClinicas = async (event) => {
        try {
          const response = await fetch(`${BASE_URL}/Clinicas`, {
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
      getClinicas()
      return () => rows
    }, []);
    return (
      <>
      <Navbar/>
      <Box height={40}/>
      <Box sx={{  display: 'flex'}}>
          <SidenavAdministrador/>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Listado de Clínicas</h1>
          <Box height={300}>
            <Box sx={{ maxWidth: 800, margin: '0 auto', alignItems: 'center', width: '60%'}}>
              <div style={{ height: '100%', width: '100%', minHeight:'100px' }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  getRowId={(row) => row.id}
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
export default ListadoClinicas;