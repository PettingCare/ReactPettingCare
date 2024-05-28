import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Sidenav from '../../Componentes/Sidenav/Sidenav';
import Navbar from '../../Componentes/Navbar';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const Citas = () => {
  const [citas, setCitas] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const BASE_URL = 'http://localhost:8000';

  useEffect(() => {
    // Función para obtener el token (debes implementar esto según tu lógica de autenticación)
    const token = JSON.parse(localStorage.getItem("token"));
    const accessToken = token.access_token;
    console.log(accessToken);


    const fetchCitas = async () => {
      try {
        const response = await fetch(`${BASE_URL}/Propietario/misCitas/`, {
          method: 'GET',
          headers: {
            "Authorization": `Bearer ${accessToken}`
          },
        });

        if (!response.ok) {
          if (response.status === 404) {
            setError('No hay citas asociadas a este usuario.');
          } else {
            throw new Error(`Error: ${response.statusText}`);
          }
        } else {
          const data = await response.json();
          setCitas(data);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCitas();
  }, []);

  return (
    <>
      <Navbar/>
      <Box height={40} />
      <Box sx={{ display: 'flex' }}>
        <Sidenav/>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Mis Citas</h1>
          <Box height={50} />
          <Box sx={{ maxWidth: '80vw', margin: '0 auto', alignItems: 'center',width: '60%' }}>

          <div className='grid-citas'>
            {loading ? (
              <p>Cargando...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre Mascota</TableCell>
                    <TableCell>Fecha Cita</TableCell>
                    <TableCell>Centro</TableCell>
                    <TableCell>Veterinario</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {citas.map((cita, index) => (
                    <TableRow  key={index}>
                      <TableCell>{cita.NombreMascota}</TableCell>
                      <TableCell>{cita.FechaCita}</TableCell>
                      <TableCell>{cita.NombreCentro}</TableCell>
                      <TableCell>{cita.VeterinarioUsername}</TableCell>
                    </TableRow >
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Citas;
