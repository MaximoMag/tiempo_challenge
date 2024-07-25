import React, { createContext, useState, useEffect } from 'react';

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Cargar favoritos del localStorage al iniciar
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const addFavorite = (city) => {
    const newFavorites = [...favorites, city];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const removeFavorite = (cityName) => {
    const newFavorites = favorites.filter(fav => fav.name !== cityName);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  return (
    <WeatherContext.Provider value={{ weatherData, setWeatherData, favorites, addFavorite, removeFavorite }}>
      {children}
    </WeatherContext.Provider>
  );
};