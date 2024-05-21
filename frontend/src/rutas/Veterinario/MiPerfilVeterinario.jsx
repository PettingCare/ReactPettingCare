import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Sidenav from '../../Componentes/Sidenav/Sidenav';
import Navbar from '../../Componentes/Navbar';
import '../propietario/MiPerfil.css'
import {AiOutlineMail, AiOutlinePhone} from 'react-icons/ai'
import SidenavVeterinario from '../../Componentes/Sidenav/SidenavVeterinario';
import NavbarVet from '../../Componentes/NavbarVet';

export default function MiPerfilVeterinario() {
  const BASE_URL = 'http://localhost:8000';
  const [especies, setEspecies] = useState([]);
  const [username, setUsername] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const getPerfil = async () => {
      const token = JSON.parse(localStorage.getItem("token"));
      const accessToken = token.access_token;
      console.log(accessToken);
      try {
        const response = await fetch(`${BASE_URL}/perfil`, {
          method: 'GET',
          headers: {
            "Authorization": `Bearer ${accessToken}`
          },
        });

        if (!response.ok) {
          throw new Error('No se pudo obtener informacion');
        }
        const data = await response.json();
        console.log(data)
        setUsername(data.username)
        setNombre(data.nombre)
        setApellidos(data.apellidos)
        setTelefono(data.telefono)
        setEmail(data.email)
      } catch (error) {
        console.error('Error al obtener mi perfil:', error);
      }
    };

    getPerfil();
  }, []);

  return (
    <>
      <NavbarVet />
      <Box height={40} />
      <Box sx={{ display: 'flex' }}>
        <SidenavVeterinario />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Mi perfil</h1>
          <div className="perfil-container">
            <div className="perfil-box">
              <img width="100px" src="https://robohash.org/propietario"></img>
              <div>
                <h3>@{username} </h3>
                <p className="perfil-nombre">{nombre} {apellidos}</p>
                <p><AiOutlinePhone/> {telefono}</p>
                <p><AiOutlineMail/> {email}</p>
                
              </div>
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
}
