import React from 'react'
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const mañana = dayjs().add(1, 'day');
const horaInicio = dayjs().set('hour', 9).set('minute', 0); // 09:00
const horaFin = dayjs().set('hour', 19).set('minute', 0); // 19:00

export default function CrearCitaDatepicker({ value, onChange }) {
    const formattedValue = dayjs(value);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <label>Fecha cita (YYYY/MM/DD hh:mm)</label>
            <Box sx={{ minWidth: 336, outline: "1px solid #0b0b0b" }}>
                <DateTimePicker
                    required
                    onChange={onChange}
                    value={formattedValue}
                    inputFormat="YYYY/MM/DD HH:mm"
                    ampm={false}
                    minDate={mañana} 
                    minTime={horaInicio}
                    maxTime={horaFin}
                />
            </Box>
        </LocalizationProvider>
    );
}


