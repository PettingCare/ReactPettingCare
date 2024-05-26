import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectMascotaProp({ value, onChange }) {
  const handleChange = (event) => {
    const selectedMascota = event.target.value;
    onChange(selectedMascota);
  };

  const BASE_URL = 'http://localhost:8000';
  const [mascotas, setMascotas] = useState([]);

  useEffect(() => {

    const token = JSON.parse(localStorage.getItem("token"));
    const accessToken = token.access_token;
    console.log(accessToken);


    const getMascotas = async () => {
      try {
        const response = await fetch(`${BASE_URL}/Propietario/misMascotasNombres/`, {
            method: 'GET',
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${accessToken}`
            },
          });

        if (!response.ok) {
          throw new Error('No se pudieron obtener las mascotas');
        }
        const data = await response.json();
        setMascotas(data);
      } catch (error) {
        console.error('Error al obtener las mascotas:', error);
      }
    };

    getMascotas();
  }, []);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="mascota-simple-label">Mascota</InputLabel>
        <Select
          labelId="mascota-simple-label"
          id="mascota-simple-select"
          value={value}
          label="Mascota"
          onChange={handleChange}
        >
          {mascotas.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
