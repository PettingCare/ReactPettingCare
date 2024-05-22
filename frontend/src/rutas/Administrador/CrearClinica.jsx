import React, { useRef, useEffect, useState } from "react";
import { FaHospitalUser, FaUsersGear } from "react-icons/fa6";
import '../../Componentes/Login-Registro/LoginRegistro.css'
import Box from '@mui/material/Box';
import Navbar from '../../Componentes/Navbar';
import { Navigate, useNavigate } from 'react-router-dom';
import SidenavAdministrador from '../../Componentes/Sidenav/SidenavAdministrador';
import './CrearClinica.css'

const BASE_URL = "http://localhost:8000";

const CrearClinica = () => 
{
  const navigate = useNavigate();
  const [gerentes, setGerentes] = useState([])
  
  useEffect(() => {
    const getGerentes = async (event) => {
      try {
        const response = await fetch(`${BASE_URL}/UserGerentes`)
        if (response.ok) {
          const data = await response.json()
          // console.log(data)
          setGerentes(data)
        }
      } catch(error) {
        console.error(error)
      }
    }
    getGerentes()
  }, [])

  const registrarClinica = async (event) => {
    event.preventDefault();
    const {nombre, gerente} = event.target.elements;
    // console.log(nombre.value)
    // console.log(gerente.options[gerente.selectedIndex].value)
    try {
      const response = await fetch(`${BASE_URL}/Clinicas/registro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre: nombre.value,
          gerente: gerente.value
        })
      });
      if (response.ok) {
        alert('Clínica registrada exitosamente.')
        navigate('/admin/Clinicas')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
    <Navbar/>
    <Box height={40}/>
    <Box sx={{  display: 'flex'}}>
        <SidenavAdministrador/>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <h1>Registro de Clínica</h1>
        <Box height={300}>
          <Box sx={{ maxWidth: 800, margin: '0 auto', alignItems: 'center', width: '60%'}}>
            <div style={{ height: '100%', width: '100%', minHeight:'100px' }}>
              <div className="signup-form">
                  <div className="form-box registro">
                    <form action="" onSubmit={registrarClinica}>
                      <div className="input-box">
                        <input type="text" name="nombre" placeholder="Nombre" required />
                        <FaHospitalUser className="icono" />
                      </div>
                      <div className="input-box">
                        <div className='gerente'>
                          <label>Gerente</label>
                          <select className='selectGerente' name='gerente' >
                            { gerentes.map((e, key) => {
                              return (
                                <option key={key} value={e.username}>
                                  {e.nombres}
                                </option>
                              )
                            })}
                          </select>
                        </div>
                      </div>
                      <button type="submit">Registrar Clínica</button>
                    </form>
                  </div>
                </div>
              </div>
            </Box>
          </Box>
        </Box>
      </Box>
      </>
  );
};
export default CrearClinica;
