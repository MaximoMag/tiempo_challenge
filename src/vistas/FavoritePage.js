import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { WeatherContext } from '../context/WeatherContext';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom'; // Asegúrate de importar useNavigate
import CircularProgress from '@mui/material/CircularProgress';
import { farenheitToCelsius } from '../utils/utils';

const FavoritePage = () => {
  const { favorites } = useContext(WeatherContext); // Asegúrate de usar 'favorites' en lugar de 'favoriteCities'
  const [favoriteWeatherData, setFavoriteWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Usa useNavigate aquí

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!favorites || favorites.length === 0) {
        setLoading(false);
        return;
      }

      try {
        const weatherResponses = await Promise.all(
          favorites.map((city) =>
            axios.get(`https://open-weather13.p.rapidapi.com/city/${city.name}/ES`, {
              headers: {
                'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
                'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
              }
            })
          )
        );
        setFavoriteWeatherData(weatherResponses.map((response) => response.data));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [favorites]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }
  
  if (favoriteWeatherData.length === 0 && !loading) {
    return (
      <Box padding={3}>
        <Typography variant="h6" gutterBottom>
          No se encontraron ciudades.
        </Typography>
      </Box>
    );
  }
  

  return (
    <Box
      sx={{
        backgroundColor: '#e0f7fa',
        minHeight: '100vh',
        padding: '20px'
      }}
    >
      <Typography variant="h3" gutterBottom>
        Ciudades Favoritas
      </Typography>
      {favoriteWeatherData && <Grid container spacing={3}>
        {favoriteWeatherData.map((cityWeather) => (
          <Grid item xs={12} sm={6} md={4} key={cityWeather.id}>
            <Card
              sx={{
                backgroundColor: '#ffffff',
                boxShadow: 3,
                borderRadius: 2,
                '&:hover': {
                  boxShadow: 6
                }
              }}
              onClick={() => navigate(`/details/${cityWeather.coord.lat}/${cityWeather.coord.lon}`)} // Usa navigate para redirigir
            >
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {cityWeather.name}
                </Typography>
                <img
                  src={`https://openweather.site/img/wn/${cityWeather.weather[0].icon}.png`}
                  alt={cityWeather.weather[0].description}
                  style={{ width: 50, height: 50, marginRight: 16 }}
                />
                <Typography variant="h6">{cityWeather.weather[0].description}</Typography>
                <Typography>Temperatura: {farenheitToCelsius(cityWeather.main.temp).toFixed(2)}°C</Typography>
                <Typography>Sensación térmica: {farenheitToCelsius(cityWeather.main.feels_like).toFixed(2)}°C</Typography>
                <Typography>Humedad: {cityWeather.main.humidity}%</Typography>
                <Typography>Viento: {cityWeather.wind.speed} m/s</Typography>
                <Button
                component={Link}
                to={`/details/${cityWeather.coord.lat}/${cityWeather.coord.lon}`}
                variant="contained"
                color="primary"
                >
                Detalles avanzados
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>}
    </Box>
  );
};

export default FavoritePage;
