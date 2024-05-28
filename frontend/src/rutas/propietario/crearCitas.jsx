import React, { useState } from 'react';
import './CrearMascota.css';
import Sidenav from '../../Componentes/Sidenav/Sidenav';
import Box from '@mui/material/Box';
import Navbar from '../../Componentes/Navbar';
import { useNavigate } from 'react-router-dom';
import SelectMascotaProp from '../../Componentes/Selects/SelectMascotaProp';
import SelectCentroProp from '../../Componentes/Selects/SelectCentroProp';
import SelectVeterinarioProp from '../../Componentes/Selects/SelectVeterinarioProp';
import CrearCitaDatepicker from '../../Componentes/Datepickers/CrearCitaDatepicker';


export default function CrearCitas() {

  const BASE_URL = 'http://localhost:8000';
  const navigate = useNavigate();
  const [nombreCentro, setNombreCentro] = useState('');
  const [nombreMascota, setNombreMascota] = useState('');
  const [usernameVeterinario, setUsernameVeterinario] = useState('');
  const [especie, setEspecie] = useState(''); // Nuevo estado para la especie de la mascota
  const [centro, setCentro] = useState('');
  const [fCita, setFCita] = useState('');
  const [renderSelectCentro, setRenderSelectCentro] = useState(false); // Estado para controlar el renderizado
  const [renderSelectVet, setRenderSelectVet] = useState(false); // Estado para controlar el renderizado
  const [renderSelectFecha, setRenderSelectFecha] = useState(false); // Estado para controlar el renderizado


  
  const handleMascotaChange = async (value1) => {
    setNombreMascota(value1);
    setNombreCentro(null); // Reinicia el valor de nombreCentro a null

    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const accessToken = token.access_token;
      console.log("Seleccionado token:", accessToken);
      let nomMascota = value1[0];
      console.log("Seleccionado Mascota:", nomMascota);

      const response = await fetch(`${BASE_URL}/Propietario/getEspecieMascota/`, {
        method: 'POST', 
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          mascota: nomMascota
        }),
      });

      if (!response.ok) {
        throw new Error('No se pudo obtener la especie de la mascota');
      }

      const data = await response.json();
      let especieMascota = data.especieSelected[0];
      console.log("Seleccionado especie1:", especieMascota);
      setEspecie(especieMascota);
      setRenderSelectCentro(true); // Activar el renderizado de SelectCentroProp
      setRenderSelectVet(false); // Desctivar el renderizado de SelectVetProp
      setRenderSelectFecha(false); // Desctivar el renderizado de SelectFechaProp

    } catch (error) {
      console.error('Error al obtener la especie de la mascota:', error);
      setRenderSelectVet(false); // Desctivar el renderizado de SelectCentroProp
      setRenderSelectCentro(false); // Desctivar el renderizado de SelectVetProp
      setRenderSelectFecha(false); // Desctivar el renderizado de SelectFechaProp
    }
  };

  const handleCentroChange = async (value2) => {
    setNombreCentro(value2);
    let centroNom= value2[0]
    setCentro(centroNom)
    setUsernameVeterinario(null); // Reinicia el valor de usernameVeterinario a null
    if(value2){
      try {
        let nomCentro = value2[0];
        console.log("Seleccionado centro:", nomCentro);

        setRenderSelectVet(true); // Activar el renderizado de SelectVetProp
      } catch (error) {
        console.error('Error en el fetch de veterinario:', error);
        setRenderSelectVet(false); // Desctivar el renderizado de SelectVetProp
      }
    }
  };


  const handleVeterinarioChange = async (value3) => {
    setUsernameVeterinario(value3);
    setFCita(null); // Reinicia el valor de fCita a null
    if(value3){

      let usernameVet = value3[0];
      setRenderSelectFecha(true); // Desctivar el renderizado de SelectFecha

      console.log("Seleccionado veterinario:", usernameVet);
    }
  };


  const registroCitaEP = async (event) => {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente
    if (!nombreMascota || !nombreCentro ||!fCita || !usernameVeterinario) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const accessToken = token.access_token;
      console.log(accessToken);

      let fechasCita=(fCita).toDate();
      console.log(fechasCita)

      const response = await fetch(`${BASE_URL}/Propietario/citas/crear`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          nombreMascota: nombreMascota[0],
          nombreCentro: nombreCentro[0],
          usernameVeterinario: usernameVeterinario[0],
          fechaCita: fechasCita
            }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Cita registrada exitosamente:', data);
        navigate("/Citas");
      } else {
        console.error('Error al registrar la cita:', data.message);
      }
    } catch (error) {
      console.error('Error al enviar solicitud:', error);
    }



    
  };
  
  

  return (
    <>
      <Navbar />
      <Box height={80} />
      <Box sx={{ display: 'flex' }}>
        <Sidenav />
        <Box height={200} />
        <Box sx={{ maxWidth: 600, margin: '0 auto', alignItems: 'center' }}>
          <div className="login-formMascota">
            <div className={"wrapperMascota"}>
              <div className="form-box loginMascota">
                <form onSubmit={registroCitaEP}>
                  <h1>Nueva Cita</h1>
                  <div className="input-boxMascota">
                    <SelectMascotaProp
                      value={nombreMascota}
                      onChange={handleMascotaChange}
                      required
                    />
                  </div>
                  {renderSelectCentro && (
                    <div className="input-boxMascota">
                      <SelectCentroProp
                        value={nombreCentro}
                        onChange={handleCentroChange}
                        especie={especie} // Pasamos la especie seleccionada al componente
                        required
                      />
                    </div>
                  )}
                  {renderSelectVet && (
                    <div className="input-boxMascota">
                      <SelectVeterinarioProp
                        value={usernameVeterinario}
                        onChange={handleVeterinarioChange}
                        centro={centro} // Pasamos el centro seleccionado al componente
                        required
                      />
                    </div>
                  )}
                  {renderSelectFecha && (
                  <div className="input-nacimiento">
                    <CrearCitaDatepicker
                      value={fCita}
                      onChange={(date) => setFCita(date)}
                      required
                    />
                  </div>
                  )}
                  <Box height={30} />
                  <button type='submit' className="btn-submit-Cita">Registrar cita</button>
                </form>
              </div>
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
}
