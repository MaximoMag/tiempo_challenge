import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';

const AppBarComponent = () => {
  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button color="inherit" component={Link} to="/" startIcon={<HomeIcon />}>
            <Typography variant="h6">Clima App</Typography>
          </Button>
          <Button color="inherit" component={Link} to="/favorites" startIcon={<StarIcon />}>
            <Typography variant="h6">Favoritos</Typography>
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default AppBarComponent;