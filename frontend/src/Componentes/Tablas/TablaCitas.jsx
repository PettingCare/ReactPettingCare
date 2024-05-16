import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Switch from '@mui/material/Switch';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'nombreMascota', headerName: 'Mascota', width: 130 },
    { field: 'Fecha', headerName: 'Fecha', width: 100 },
    
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

const rows = [
    { id: 1, nombreMascota: 'Juan', fecha: '2024-12-12' },
    { id: 2, nombreMascota: 'María', fecha: '2024-12-12' },
];

export default function TablaCitas() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        // initialState={{
        //   pagination: {
        //     paginationModel: { page: 0, pageSize: 5 },
        //   },
        // }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
      />
    </div>
  );
}
