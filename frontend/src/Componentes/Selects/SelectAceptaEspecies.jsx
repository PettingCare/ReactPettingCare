import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
export default function SelectAceptaEspecies({ value, onChange }) {
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);
  
    useEffect(() => {
      // Al iniciar, establece el valor inicial del componente
      setPersonName(value);
    }, [value]);
  

    const handleChange = (event) => {
        const {
          target: { value: selectedValues },
        } = event;
      
        // Filtra los valores seleccionados para asegurarte de que sean únicos y no estén duplicados
        const uniqueSelectedValues = selectedValues.filter((value, index, self) => self.indexOf(value) === index);
      
        setPersonName(uniqueSelectedValues);
        onChange(uniqueSelectedValues);

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
      <div>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-chip-label">Especies</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={personName || []} // Asegurarse de que sea un array
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {especies.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, personName, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
