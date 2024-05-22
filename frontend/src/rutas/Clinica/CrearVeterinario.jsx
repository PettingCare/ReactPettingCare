import React, { useRef, useEffect, useState } from "react";
import { FaHospitalUser, FaUsersGear } from "react-icons/fa6";
import { RiLockPasswordFill  } from "react-icons/ri";
import { IoMdMail } from "react-icons/io";
import { FaUserAlt,FaPhoneAlt } from "react-icons/fa";
import { IoIosEye, IoIosEyeOff  } from "react-icons/io";
import { FaUserAstronaut } from "react-icons/fa6";
import Box from '@mui/material/Box';
import Navbar from '../../Componentes/Navbar';
import SidenavClinica from '../../Componentes/Sidenav/SidenavClinica';

const CrearVeterinario = () => {
  const registrarVeterinario = async(event) => {

  }

  /*toggle para pinchar en el ojo y que enseñe la contraseña*/
  const [passwordVisible, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!passwordVisible);
  }
  // Prueba validar movil, 9 digitos
  const [telefono, settelefono] = useState("");
  const [isError, setIsError] = useState(false);
  const pattern = new RegExp(/^\d{9}$/);

  return (
    <>
      <Navbar />
      <Box height={40} />
      <Box sx={{ display: "flex" }}>
        <SidenavClinica />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Registro de Veterinario</h1>
          <Box height={300}>
            <Box
              sx={{
                maxWidth: 800,
                margin: "0 auto",
                alignItems: "center",
                width: "60%",
              }}
            >
              <div
                style={{ height: "100%", width: "100%", minHeight: "100px" }}
              >
                <div className="signup-form">
                  <div className="form-box registro">
                    <form action="" onSubmit={registrarVeterinario}>
                      <div className="input-box">
                        <input
                          type="text"
                          name="nombre"
                          placeholder="Nombre"
                          required
                        />
                        <FaHospitalUser className="icono" />
                      </div>

                      <div className="input-box">
                        <input
                          type="text"
                          name="apellidos"
                          placeholder="Apellidos"
                          required
                        />
                        <FaUserAlt className="icono" />
                      </div>

                      <div className="input-box">
                        <input
                          type="email"
                          name="email"
                          placeholder="Correo electrónico"
                          required
                        />
                        <IoMdMail className="icono" />
                      </div>
                      <div className="input-box">
                        <input
                          type={passwordVisible ? "text" : "password"}
                          name="password"
                          placeholder="Contraseña"
                          required
                        />
                        <RiLockPasswordFill className="icono" />
                        {passwordVisible ? (
                          <IoIosEye
                            className="showPass"
                            onClick={togglePasswordVisibility}
                          />
                        ) : (
                          <IoIosEyeOff
                            className="showPass"
                            onClick={togglePasswordVisibility}
                          />
                        )}
                      </div>
                      <div className="input-box">
                        <input
                          type="text"
                          name="username"
                          placeholder="Username"
                          required
                        />
                        <FaUserAstronaut className="icono" />
                      </div>
                      <div className="input-box">
                        <input
                          value={telefono}
                          type="number"
                          name="telefono"
                          placeholder="Telefono"
                          onChange={(e) => {
                            settelefono(e.target.value);
                            if (!pattern.test(e.target.value)) setIsError(true);
                            else setIsError(false);
                          }}
                          required
                        />
                        <FaPhoneAlt className="icono" />
                        <h6>
                          Tu numero es:
                          {isError ? "Numero incorrecto" : "+34 " + telefono}
                        </h6>
                      </div>
                      <button type="submit">Registrar</button>
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
}

export default CrearVeterinario;