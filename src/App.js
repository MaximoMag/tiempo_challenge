import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WeatherProvider } from './context/WeatherContext';
import HomePage from './vistas/HomePage';
import FavoritePage from './vistas/FavoritePage';
import DetailsPage from './vistas/DetailsPage';
import theme from './theme'; // Asegúrate de importar el tema correcto
import AppBarComponent from './components/AppBarComponent';


function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
      <WeatherProvider>
        <Router>
          <AppBarComponent/>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/favorites" element={<FavoritePage />} />
            <Route path="/details/:lat/:lon" element={<DetailsPage />} />
          </Routes>
        </Router>
      </WeatherProvider>
    </ThemeProvider>
    </>
  );
}

export default App;
