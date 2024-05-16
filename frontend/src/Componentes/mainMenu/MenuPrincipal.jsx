import React from 'react';
import './MenuPrincipal.css'
import Sidenav from '../Sidenav/Sidenav';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginRegistro from '../Login-Registro/LoginRegistro';
import Inicio from '../../rutas/propietario/Inicio';
import Ayuda from '../../rutas/propietario/Ayuda';
import PrivateRoutes from '../../utils/PrivateRoutes';
import Mascotas from '../../rutas/propietario/Mascotas';
import Citas from '../../rutas/propietario/Citas';
import CrearMascota from '../../rutas/propietario/crearMascota';
import MiPerfil from '../../rutas/propietario/MiPerfil';


const MenuPrincipal = () => {

  return (
    <Router>
      <Routes>

        <Route element = {<PrivateRoutes/>}>
          {/* Rutas privadas */}
          <Route path="/inicio" element={<Inicio/>} />
          <Route path="/mascotas" element={<Mascotas/>} />
          <Route path="/ayuda" element={<Ayuda/>} />
          <Route path="/citas" element={<Citas/>} />
          <Route path="/CrearMascota" element={<CrearMascota/>} />
          <Route path="/MiPerfil" element={<MiPerfil/>} />

        </Route>
        {/* Unica ruta publica (hasta que tengamos /Home con la presentacion) */}
        <Route path="/login" element = {<LoginRegistro/>}/>

      </Routes>
    </Router>

  );
};

export default MenuPrincipal;
