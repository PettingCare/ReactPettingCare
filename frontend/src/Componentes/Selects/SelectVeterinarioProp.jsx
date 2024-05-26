import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function SelectVeterinarioProp({ value, onChange, centro }) {
  const handleChange = (event) => {
    const selectedCentro = event.target.value;
    onChange(selectedCentro);
  };

  const BASE_URL = 'http://localhost:8000';
  const [veterinarios, setVeterinarios] = useState([]);

  useEffect(() => {
    const getVeterinarios = async () => {
      console.log("Seleccionado centro1SelectVet:", centro);

      try {
        const response = await fetch(`${BASE_URL}/Propietario/selectVeterinarios/`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            centro: centro
          }),
        });
        if (!response.ok) {
          throw new Error('No se pudieron obtener los centros para esta especie');
        }
        const data = await response.json();
        setVeterinarios(data);
      } catch (error) {
        console.error('Error al obtener centros para la especie seleccionada:', error);
        setVeterinarios([]); // Limpiar select en caso de error
      }
    };

    if (centro) {
        getVeterinarios();
    } else {
        getVeterinarios([]); // Limpiar select si especie es vacía
    }
  }, [centro]);


return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="veterinario-simple-label">Veterinarios</InputLabel>
        <Select
          labelId="veterinario-simple-label"
          id="veterinario-simple-select"
          value={value}
          label="Veterinario"
          onChange={handleChange}
        >
          {veterinarios.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
