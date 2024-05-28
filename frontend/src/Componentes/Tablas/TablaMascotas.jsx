import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const BASE_URL = 'http://localhost:8000';

const TablaMascotas = () => {
  const [rows, setRows] = useState([])

  const columns = [
    {
      field: 'idMascota',
      headerName: 'ID',
      width: 150,
      editable: false
    },
    {
      field: 'nombre',
      headerName: 'Mascota',
      width: 320,
      editable: false
    },
    {
      field: 'especie',
      headerName: 'Especie',
      width: 250,
      editable: false
    },
    {
      field: 'nacimiento',
      headerName: 'Nacimiento',
      width: 250,
      editable: false
    },

  ];
  useEffect(() => {
    const getMascotas = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const accessToken = token.access_token;
        const response = await fetch(`${BASE_URL}/Mascotas/misMascotas`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${accessToken}`
          },
        });
        if (response.ok) {
          const data = await response.json()
          console.log(data)
          setRows(data)
        }
      } catch(error) {
        alert(error)
      }
    }
    getMascotas()
    return () => rows;
  },
  // eslint-disable-next-line
  []);

  return (
      <div style={{ height: '100%', width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.idMascota}
          rowsPerPageOptions={[10]}
          disableRowSelectionOnClick
          isCellEditable={() => false
          }
        />
      </div>
  )
}

export default TablaMascotas;