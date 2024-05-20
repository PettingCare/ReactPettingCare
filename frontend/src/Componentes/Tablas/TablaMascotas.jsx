import React, { useRef, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Switch from '@mui/material/Switch';

const BASE_URL = 'http://localhost:8000';

const TablaMascotas = () => {
  const [rows, setRows] = useState([])

  const columns = [
    {
      field: 'idMascota',
      headerName: 'ID',
      width: 70
    },
    {
      field: 'nombre',
      headerName: 'Mascota',
      width: 130
    },
    {
      field: 'especie',
      headerName: 'Especie',
      width: 130
    },
    {
      field: 'nacimiento',
      headerName: 'Nacimiento',
      width: 100
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 100,
      renderCell: (params) => (
        <Switch
          checked={params.row.estado === 'Activo'}
          onChange={(event) => {
            // Aquí puedes manejar la lógica para cambiar el estado
            console.log('Switch changed:', event.target.checked);
          }}
        />
      ),
    },
  ];
  useEffect(() => {
    const getMascotas = async (event) => {
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
          // for (const mascota of data) {
          //   console.log(mascota)
          //   const obj = {
          //     'idMascota': mascota.idMascota,
          //     'nombre': mascota.nombre,
          //     'nacimiento': mascota.nacimiento,
          //     'especie': mascota.especie
          //   }
          //   rows.push(obj)
          // }
          setRows(data)
        }
      } catch(error) {
        alert(error)
      }
    }
    getMascotas()
    return () => rows;
  }, []);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.idMascota}
        // initialState={{
        //   pagination: {
        //     paginationModel: { page: 0, pageSize: 5 },
        //   },
        // }}
        // pageSizeOptions={[]}
        rowsPerPageOptions={[10]}
        // checkboxSelection
      />
    </div>
  )
}

export default TablaMascotas;