import React, { useEffect, useState } from 'react';
import { DataGrid,GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import { Grid, Typography } from '@mui/material';

const DataGridTable = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // Fetch submitted data from the backend
    axios.get('http://localhost:8080/api/submit').then((res) => {
      setRows(res.data);
    });
  }, []);

  const columns = [
    { field: 'userId', headerName: 'ID', width: 90 },
    { field: 'firstName', headerName: 'First Name', width: 150 },
    { field: 'lastName', headerName: 'Last Name', width: 150 },
    { field: 'email', headerName: 'E-Mail', width: 200 },
    { field: 'country', headerName: 'Country', width: 150 },
    { field: 'state', headerName: 'State', width: 150 },
    { field: 'city', headerName: 'City', width: 150 },
    { field: 'gender', headerName: 'Gender', width: 100 },
    { field: 'dob', headerName: 'Date of Birth', width: 150 },
    { field: 'age', headerName: 'Age', width: 100 },
  ];

  return (
    <div style={{width:"90%", marginLeft:"5%"}}>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Submitted Data
        </Typography>
      </Grid>
      <Grid container spacing={2}>
      <Grid item xs={12}>
        <div style={{ height: 400, width: '100%' }}>
        <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        pageSizeOptions={[5, 10, 20, 30, 50, 100]}
        components={{
          Toolbar: GridToolbar, 
        }}
        sx={{
          '& .MuiDataGrid-columnHeaders': {
            
            fontSize: '16px',
            fontWeight: 'bold',
          },
          '& .MuiDataGrid-toolbarContainer': {
            justifyContent: 'flex-end',
          },
          '& .MuiDataGrid-row': {
            backgroundColor: '#E8F0FE', // Row background color
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: '#D0E7FD', // Hover effect for rows
          },
        }}
      />
      

        </div>
      </Grid>
    </Grid>
    </Grid>
    </div>
  );
};

export default DataGridTable;
