import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Snackbar } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LogInTest() {
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [errorSnackbar, setErrorSnackbar] = useState(false); // Add this line
    const navigate = useNavigate();

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/login/', loginData, { withCredentials: true });
            if (response.status === 200) {
                setOpenSnackbar(true);
                navigate('/dashboard'); // Redirects to the dashboard upon successful login
            }
        } catch (error) {
            console.error('There was an error logging in:', error.response);
            setErrorSnackbar(true); // Show error snackbar when login fails
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Log In
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="username"
                    value={loginData.username}
                    onChange={handleChange}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="password"
                    type="password"
                    value={loginData.password}
                    onChange={handleChange}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Log In
                </Button>
            </form>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message="Login successful!"
            />
            <Snackbar
                open={errorSnackbar}
                autoHideDuration={6000}
                onClose={() => setErrorSnackbar(false)}
                message="Login failed. Please try again."
            />
        </Container>
    );
}

export default LogInTest;
