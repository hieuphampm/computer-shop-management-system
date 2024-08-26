import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';

function Dashboard() {
  return (
    <Container>
      <Typography variant="h3" gutterBottom>Admin Dashboard</Typography>
      <Button variant="contained" component={Link} to="/manage-employees">
        Manage Employees
      </Button>
    </Container>
  );
}

export default Dashboard;
