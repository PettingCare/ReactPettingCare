// PrivateRoute.jsx

import React , { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';


const PrivateRoutes = () => {
  const isAuthenticated = !!localStorage.getItem('token');
  const navigate = useNavigate();
  let auth = {'Token' : true}

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    } else {
      // TODO: Obtener el tipo de usuario y redigirlo a la página que le toca.
      // TODO: Guardar el rol del usuario también.
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? <Outlet/> : null;
};

export default PrivateRoutes;
