import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#007BFF', // Azul
    },
    secondary: {
      main: '#00BFFF', // Celeste
    },
    background: {
      default: '#E0F7FA', // Fondo celeste claro
      paper: '#FFFFFF', // Blanco para tarjetas y elementos de papel
    },
    text: {
      primary: '#007BFF', // Azul para textos
    },
  },
  typography: {
    h1: {
      color: '#007BFF',
    },
    h2: {
      color: '#00BFFF',
    },
    h3: {
      color: '#007BFF',
    },
    body1: {
      color: '#007BFF',
    },
  },
});

export default theme;