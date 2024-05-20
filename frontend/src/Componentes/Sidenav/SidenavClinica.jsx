import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { MdOutlinePets } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { GiDogHouse,GiHospitalCross } from "react-icons/gi";
import { FaDog } from "react-icons/fa6";
import { LiaHospital } from "react-icons/lia";


import { FaHome, FaRegHospital   } from 'react-icons/fa';
import { BiSolidHelpCircle } from "react-icons/bi";
import { TfiStatsUp } from "react-icons/tfi";
import { useNavigate } from 'react-router-dom';
import { usoAppInstance } from '../../appInstance';
import './Sidenav.css'
import '../../App.css'
const drawerWidth = 240;



const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',

    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function SidenavClinica() {

  const theme = useTheme();
  //const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const updateOpen = usoAppInstance((state) => state.updateOpen);
  const open = usoAppInstance((state) => state.dopen);


  const [abierto, setAbierto] = React.useState(true);

  const handleClick = () => {
    setAbierto(!abierto);
  };


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader/>
        <Divider />
        <List>


        <ListItem disablePadding sx={{display:"block"}} onClick={()=> {navigate("/Clinica/Inicio")}}>
            <ListItemButton
              sx={{
                minHeight:48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                  sx={{
                  minWidth:0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  }}>
               <FaHome/>
              </ListItemIcon>
              <ListItemText primary="Inicio" sx={{opacity: open ? 1 : 0}}/>
            </ListItemButton>

          </ListItem>

              <ListItemButton onClick={handleClick}>
              <ListItemIcon>
                <FaRegHospital  />
              </ListItemIcon>
              <ListItemText primary="Centros" />
              {abierto ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={abierto} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }} onClick={()=> {navigate("/Clinica/MisCentros")}}>
                  <ListItemIcon>
                    <GiHospitalCross />
                  </ListItemIcon>
                  <ListItemText primary="Mis Centros" />
                </ListItemButton>

                <ListItemButton sx={{ pl: 4 }} onClick={()=> {navigate("/Clinica/CrearCentro")}}>
                  <ListItemIcon>
                    <LiaHospital />
                  </ListItemIcon>
                  <ListItemText primary="Nuevo Centro" />
                </ListItemButton>
              </List>
            </Collapse>


          <ListItem disablePadding sx={{display:"block"}} onClick={()=> {navigate("/Clinica/ayuda")}}>
            <ListItemButton
              sx={{
                minHeight:48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                  sx={{
                  minWidth:0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  }}>
               <BiSolidHelpCircle/>
              </ListItemIcon>
              <ListItemText primary="Ayuda" sx={{opacity: open ? 1 : 0}}/>
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
      </Drawer>

    </Box>
  );
}
