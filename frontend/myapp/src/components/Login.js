import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Snackbar } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext'; // Context hook for user state management.

function Login() {
    // Local state to manage login data and snackbar notifications.
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [errorSnackbar, setErrorSnackbar] = useState(false);

    // Hooks for navigation and user context.
    const navigate = useNavigate();
    const { setUser } = useUser();

    // Handle input changes for login form.
    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    // Handle the login form submission.
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/login/', loginData, { withCredentials: true });
            if (response.status === 200) {
                setUser({ username: loginData.username }); // Update user context.
                navigate('/dashboard'); // Navigate to the dashboard on success.
                setOpenSnackbar(true); // Show success snackbar.
            }
        } catch (error) {
            console.error('There was an error logging in:', error.response || error);
            setErrorSnackbar(true); // Show error snackbar on failure.
        }
    };

    // Close the snackbar notifications.
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
        setErrorSnackbar(false);
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
                onClose={handleCloseSnackbar}
                message="Login failed. Please try again."
            />
        </Container>
    );
}

export default Login;
