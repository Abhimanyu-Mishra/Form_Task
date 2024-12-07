import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import InputForm from './InputForm';
import DataGridTable from './DataGridTable';

const NavigationPage = () => {
  const [activeComponent, setActiveComponent] = useState('form'); // Default to Input Form

  const renderComponent = () => {
    if (activeComponent === 'form') {
      return <InputForm />;
    }
    return <DataGridTable />;
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#F0F0D0' }}>
      <AppBar position="static" sx={{ backgroundColor: '#3f51b5' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Task 
          </Typography>
          <Button
            color="inherit"
            onClick={() => setActiveComponent('form')}
            sx={{ marginRight: 1 }}
          >
            Input Form
          </Button>
          <Button color="inherit" onClick={() => setActiveComponent('table')}>
            Show Data 
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sx" sx={{ padding: 3 }}>
        {renderComponent()}
      </Container>
    </Box>
  );
};

export default NavigationPage;
