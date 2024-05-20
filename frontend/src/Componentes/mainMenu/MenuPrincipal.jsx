import React from 'react';
import './MenuPrincipal.css'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginRegistro from '../Login-Registro/LoginRegistro';
import Inicio from '../../rutas/propietario/Inicio';
import Ayuda from '../../rutas/propietario/Ayuda';
import PrivateRoutes from '../../utils/PrivateRoutes';
import Mascotas from '../../rutas/propietario/Mascotas';
import Citas from '../../rutas/propietario/Citas';
import CrearMascota from '../../rutas/propietario/crearMascota';
import MiPerfil from '../../rutas/propietario/MiPerfil';
import NotFound from '../../rutas/NotFound/NotFound';
import InicioClinica from '../../rutas/Clinica/InicioClinica';
import InicioVeterinario from '../../rutas/Veterinario/InicioVeterinario';
import CrearCentro from '../../rutas/Clinica/CrearCentro';
import MisCentros from '../../rutas/Clinica/MisCentros';
import AyudaClinica from '../../rutas/Clinica/AyudaClinica';
import AyudaVeterinario from '../../rutas/Veterinario/AyudaVeterinario';
import CitasVeterinario from '../../rutas/Veterinario/CitasVeterinario';


const MenuPrincipal = () => {

  return (
    <Router>
      <Routes>
        <Route element = {<PrivateRoutes/>}>
          {/* Rutas privadas */}
          <Route path="/inicio" element={<Inicio/>} />
          <Route path="/mascotas" element={<Mascotas/>} />
          <Route path="/ayuda" element={<Ayuda/>} />
          <Route path="/Clinica/ayuda" element={<AyudaClinica/>} />
          <Route path="/citas" element={<Citas/>} />
          <Route path="/CrearMascota" element={<CrearMascota/>} />
          <Route path="/MiPerfil" element={<MiPerfil/>} />
          <Route path="/Clinica/Inicio" element={<InicioClinica/>} />
          <Route path="/Clinica/MisCentros" element={<MisCentros/>} />
          <Route path="/Clinica/CrearCentro" element={<CrearCentro/>} />
          <Route path="/Veterinario/Inicio" element={<InicioVeterinario/>} />
          <Route path="/Veterinario/ayuda" element={<AyudaVeterinario/>} />
          <Route path="/Veterinario/Citas" element={<CitasVeterinario/>} />


        </Route>
        <Route path="/" element = {<LoginRegistro/>}/>
        <Route path="*" element = {<NotFound/>}/>

      </Routes>
    </Router>
  );
};

export default MenuPrincipal;