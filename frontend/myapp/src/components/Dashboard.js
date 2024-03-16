import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();

    // Navigate to the profile page
    const goToProfile = () => navigate('/profile');

    // Navigate to the forums page
    const goToForums = () => navigate('/forums');

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Dashboard
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={goToProfile}
                fullWidth
                style={{ marginBottom: '10px' }}
            >
                Go to Profile
            </Button>
            <Button
                variant="contained"
                color="secondary"
                onClick={goToForums}
                fullWidth
            >
                Go to Forums
            </Button>
        </Container>
    );
}

export default Dashboard;
