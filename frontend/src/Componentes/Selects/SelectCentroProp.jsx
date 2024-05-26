import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectCentroProp({ value, onChange, especie }) {
  const handleChange = (event) => {
    const selectedCentro = event.target.value;
    onChange(selectedCentro);
  };

  const BASE_URL = 'http://localhost:8000';
  const [centros, setCentros] = useState([]);

  useEffect(() => {
    const getCentros = async () => {
      console.log("Seleccionado especie1SelectProp:", especie);
        
      try {
        const response = await fetch(`${BASE_URL}/Propietario/selectCentros/`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            especie: especie
          }),
        });
        if (!response.ok) {
          throw new Error('No se pudieron obtener los centros para esta especie');
        }
        const data = await response.json();
        setCentros(data);
      } catch (error) {
        console.error('Error al obtener centros para la especie seleccionada:', error);
        setCentros([]); // Limpiar centros en caso de error
      }
    };

    if (especie) {
      getCentros();
    } else {
      setCentros([]); // Limpiar centros si especie es vacía
    }
  }, [especie]);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="Centro-simple-label">Centro</InputLabel>
        <Select
          labelId="Centro-simple-label"
          id="Centro-simple-select"
          value={value}
          label="Centro"
          onChange={handleChange}
        >
          {centros.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
