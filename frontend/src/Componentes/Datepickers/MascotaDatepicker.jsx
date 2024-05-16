import React from 'react'
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const ayer = dayjs().subtract(1, 'day');

export default function MascotaDatepicker({ value, onChange }) {
  const [error, setError] = React.useState(null);

  const formattedValue = dayjs(value);

  const onSubmit = (value) => {
    const { fechaValue } = value;
    if (!fechaValue) {
      console.error('La fecha de inicio no está definida.');
      return;
    }
   
    const fechaValues = dayjs(fechaValue).format('YYYY-MM-DD');
    console.log(fechaValues);
    // Otros procesos aquí
  };

  const errorMessage = React.useMemo(() => {
    switch (error) {
      case 'maxDate': {
        alert( `Tu perro no puede haber nacido en el futuro!, fecha minima de nacimiento: ${ayer}`);
        break
      }

      case 'invalidDate': {
        return 'Fecha invalida';
      }

      default: {
        return '';
      }
    }
  }, [error]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <label>Fecha nacimiento (YYYY-MM-DD)</label>
      <Box sx={{ minWidth: 336, outline: "1px solid #0b0b0b" }}>
        <DatePicker
          required
          onChange={onChange}
          value={formattedValue}
          format='YYYY-MM-DD'
          maxDate={ayer} 
          views={['year', 'month', 'day']}
        />
      </Box>
    </LocalizationProvider>
  );
}

