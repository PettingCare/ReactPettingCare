import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectEspecieProp({ value, onChange }) {
  const handleChange = (event) => {
    const selectedEspecie = event.target.value;
    onChange(selectedEspecie);
  };

  const BASE_URL = 'http://localhost:8000';
  const [especies, setEspecies] = useState([]);

  useEffect(() => {
    const getEspecies = async () => {
      try {
        const response = await fetch(`${BASE_URL}/Especies/`);
        if (!response.ok) {
          throw new Error('No se pudieron obtener las especies');
        }
        const data = await response.json();
        setEspecies(data);
      } catch (error) {
        console.error('Error al obtener especies:', error);
      }
    };

    getEspecies();
  }, []);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="especie-simple-label">Especie</InputLabel>
        <Select
          labelId="especie-simple-label"
          id="especie-simple-select"
          value={value}
          label="Especie"
          onChange={handleChange}
        >
          {especies.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
