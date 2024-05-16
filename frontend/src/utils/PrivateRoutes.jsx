// PrivateRoute.jsx

import React , { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';


const PrivateRoutes = () => {
  const isAuthenticated = !!localStorage.getItem('token');
  const navigate = useNavigate();
  let auth = {'Token' : true}

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? <Outlet/> : null;
};

export default PrivateRoutes;
