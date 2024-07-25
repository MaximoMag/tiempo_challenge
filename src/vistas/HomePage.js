import React, { useState, useContext } from 'react';
import axios from 'axios';
import { WeatherContext } from '../context/WeatherContext';
import { TextField, Button, Card, CardContent, Typography, Grid, Box, IconButton, Checkbox, FormControlLabel } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';
import { farenheitToCelsius } from '../utils/utils';


const HomePage = () => {
  const [city, setCity] = useState('');
  const { setWeatherData, favorites, addFavorite, removeFavorite } = useContext(WeatherContext);
  const [isFavorite, setIsFavorite] = useState(false);

  const [cityWeather, setCityWeather] = useState(null);

  const handleSearch = async () => {
    
    const options = {
      method: 'GET',
      url: `https://open-weather13.p.rapidapi.com/city/${city}/ES`,
      headers: {
        'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY, // poner el .ENV
        'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
      }
    };
    
    try {
      const response = await axios.request(options);
      if (response.data.cod === "404") {
        return; //manejar caso de no encontrar ciudad
      } else {
        setCityWeather(response.data);
        setIsFavorite(favorites.some(fav => fav.name === response.data.name));
      }
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFavorite(cityWeather.name);
    } else {
      const cityData = {
        lat: cityWeather.coord.lat,
        lon: cityWeather.coord.lon,
        name: cityWeather.name
      };
      addFavorite(cityData);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <Typography variant="h3" gutterBottom>
        Pronóstico del tiempo
      </Typography>
      <Card sx={{ maxWidth: 600, width: '100%', padding: '20px', backgroundColor: 'background.paper' }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                value={city}
                onChange={(e) => setCity(e.target.value)}
                label="Buscar Ciudad"
                fullWidth
                variant="outlined"
                sx={{ marginBottom: '20px' }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={handleSearch}
                variant="contained"
                color="primary"
                fullWidth
                sx={{ padding: '10px 0' }}
              >
                Buscar
              </Button>
            </Grid>
          </Grid>
          {cityWeather && (
            <Box mt={4}>
              <img
                src={`https://openweather.site/img/wn/${cityWeather.weather[0].icon}.png`}
                alt={cityWeather.weather[0].description}
                style={{ width: 50, height: 50, marginRight: 16 }}
              />
              <Grid container alignItems="center" justifyContent="space-between">
                <Typography variant="h4">{cityWeather.name}</Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={<StarBorder />}
                      checkedIcon={<Star style={{ color: 'yellow' }} />}
                      checked={isFavorite}
                      onChange={handleFavoriteToggle}
                    />
                  }
                  label="Favorito"
                />
              </Grid>
              <Typography variant="h6">{cityWeather.weather[0].description}</Typography>
              <Typography variant="h4">{farenheitToCelsius(cityWeather.main.temp).toFixed(2)}°C</Typography>
              <Typography>Sensación térmica: {cityWeather.main.feels_like.toFixed(2)}°C</Typography>
              <Typography>Mínima: {cityWeather.main.temp_min.toFixed(2)}°C / Máxima: {cityWeather.main.temp_max.toFixed(2)}°C</Typography>
              <Typography>Humedad: {cityWeather.main.humidity}%</Typography>
              <Typography>Viento: {cityWeather.wind.speed} m/s</Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default HomePage;
