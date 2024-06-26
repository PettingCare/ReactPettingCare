import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Sidenav from '../../Componentes/Sidenav/Sidenav';
import Navbar from '../../Componentes/Navbar';
import './MiPerfil.css'
import {AiOutlineMail, AiOutlinePhone} from 'react-icons/ai'

export default function MiPerfil() {
  const BASE_URL = 'http://localhost:8000';
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
      <Navbar />
      <Box height={40} />
      <Box sx={{ display: 'flex' }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Mi perfil</h1>
          <div className="perfil-container">
            <div className="perfil-box">
              <img width="100px" src="https://robohash.org/propietario" alt="foto de perfil"></img>
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
