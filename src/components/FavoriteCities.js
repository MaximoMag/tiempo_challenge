import React, { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import { Card, CardContent } from '@material-ui/core';

const FavoritePage = () => {
  const { favorites } = useContext(WeatherContext);

  return (
    <div>
      {favorites.map((city, index) => (
        <Card key={index}>
          <CardContent>{city}</CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FavoritePage;
