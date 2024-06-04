import React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import MUIToolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Toolbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <MUIToolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Rick & Morty
          </Typography>
        </MUIToolbar>
      </AppBar>
    </Box>
  );
};

export default Toolbar;
