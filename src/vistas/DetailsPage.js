import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; 
import { kelvinToCelsius } from '../utils/utils';

const DetailsPage = () => {
  const { lat, lon } = useParams();
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedDayData, setSelectedDayData] = useState(null);

  const parseToGMT_3 = (data) => {
    const updatedList = data.list.map((item) => {
      const date = new Date(item.dt * 1000);
      date.setHours(date.getHours() - 3); // Restar 3 horas para ajustar a la zona horaria de Argentina
      return {
        ...item,
        dt: date.getTime() / 1000, // Actualizar el tiempo en segundos
        dt_txt: date.toISOString().slice(0, 19).replace('T', ' '), // Formato de texto
      };
    });
    return { ...data, list: updatedList };
  };

  const handleDayClick = (dayIndex) => {
    setSelectedDayIndex(dayIndex * 8)
    const selectedData = weatherData.list.slice(dayIndex * 8, dayIndex * 8 + 8);
    setSelectedDayData(selectedData);
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Hora',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Valor',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  const chartStyle = {
    height: '400px', // Ajustar la altura del gráfico
    width: '80%', // Ajustar el ancho del gráfico
    margin: '0 auto',
  };

  const createChartData = (data) => ({
    labels: data.map((item) => {
      const date = new Date(item.dt * 1000);
      const hours = date.getHours();
      return `${hours}:00`; // Horas ya ajustadas a la zona horaria de Argentina
    }),
    datasets: [
      {
        label: 'Temperatura (°C)',
        data: data.map((item) => kelvinToCelsius(item.main.temp)),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: false,
        tension: 0.1,
      },
      {
        label: 'Humedad (%)',
        data: data.map((item) => item.main.humidity),
        borderColor: 'rgba(153,102,255,1)',
        backgroundColor: 'rgba(153,102,255,0.2)',
        fill: false,
        tension: 0.1,
      },
      {
        label: 'Velocidad del viento (m/s)',
        data: data.map((item) => item.wind.speed),
        borderColor: 'rgba(255,159,64,1)',
        backgroundColor: 'rgba(255,159,64,0.2)',
        fill: false,
        tension: 0.1,
      },
    ],
  });

  useEffect(() => {
    const fetchWeatherData = async () => {
      const options = {
        method: 'GET',
        url: `https://open-weather13.p.rapidapi.com/city/fivedaysforcast/${lat}/${lon}`,
        headers: {
          'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
          'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        const processedData = parseToGMT_3(response.data);
        setWeatherData(processedData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [lat, lon]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!weatherData) {
    return (
      <Box padding={3}>
        <Typography variant="h6" gutterBottom>
          No se encontró información del Pronóstico.
        </Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh" mt={3}>
      <Typography variant="h3" gutterBottom>{weatherData.city.name}</Typography>
      <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
        <img
          src={`https://openweather.site/img/wn/${weatherData.list[selectedDayIndex].weather[0].icon}.png`}
          alt={weatherData.list[0].weather[0].description}
          style={{ width: 100, height: 100, marginBottom: 16 }}
        />
        <Typography variant="h5">{kelvinToCelsius(weatherData.list[selectedDayIndex].main.temp).toFixed(2)}°C</Typography>
        <Typography>Sensación térmica: {kelvinToCelsius(weatherData.list[selectedDayIndex].main.feels_like).toFixed(2)}°C</Typography>
        <Typography>Mínima: {kelvinToCelsius(weatherData.list[selectedDayIndex].main.temp_min).toFixed(2)}°C / Máxima: {kelvinToCelsius(weatherData.list[0].main.temp_max).toFixed(2)}°C</Typography>
        <Typography>Humedad: {weatherData.list[selectedDayIndex].main.humidity}%</Typography>
        <Typography>Viento: {weatherData.list[selectedDayIndex].wind.speed} m/s</Typography>
      </Box>
      <Box display="flex" justifyContent="center" mb={4}>
        {weatherData.list.filter((_, idx) => idx % 8 === 0).map((dayData, index) => (
          <Box
            key={index}
            onClick={() => handleDayClick(index)}
            p={2}
            m={1}
            textAlign="center"
            bgcolor="background.paper"
            borderRadius={8}
            boxShadow={2}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={`https://openweather.site/img/wn/${dayData.weather[0].icon}.png`}
              alt={dayData.weather[0].description}
              style={{ width: 40, height: 40 }}
            />
            <Typography variant="body2">{new Date(dayData.dt_txt).toLocaleDateString('es-ES', { weekday: 'short' })}</Typography>
            <Typography variant="body2">{kelvinToCelsius(dayData.main.temp).toFixed(1)}°C</Typography>
          </Box>
        ))}
      </Box>
      {selectedDayData && (
        <Box mt={4} style={chartStyle}>
          <Line data={createChartData(selectedDayData)} options={chartOptions} />
        </Box>
      )}
    </Box>
  );
};

export default DetailsPage;
