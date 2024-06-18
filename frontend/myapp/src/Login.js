import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Snackbar, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from './context/UserContext';

function Login() {
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '' });
    const navigate = useNavigate();
    const { setUser } = useUser();

    const handleChange = (e) => {
        setLoginData({...loginData, [e.target.name]: e.target.value });
        console.log('Input changed:', e.target.name, e.target.value); // Debugging log
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login/', loginData, { withCredentials: true });
            console.log('Login response:', response); // Debugging log
            if (response.status === 200) {
                setUser({ email: loginData.email, token: response.data.token });
                navigate('/dashboard');
                setSnackbar({ open: true, message: 'Login successful!' });
            } else {
                throw new Error('Authentication failed');
            }
        } catch (error) {
            console.error('Login error:', error); // Debugging log
            setSnackbar({ 
                open: true, 
                message: error.response?.data?.error || 'Login failed. Please try again.' 
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSignUpClick = () => {
        navigate('/signup'); // Navigation to SignUp page
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ open: false, message: '' });
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>Log In</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="email"
                    autoComplete="email"
                    value={loginData.email}
                    onChange={handleChange}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={loginData.password}
                    onChange={handleChange}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                    {loading? <CircularProgress size={24} /> : 'Log In'}
                </Button>
                <Button onClick={handleSignUpClick} color="secondary" fullWidth style={{ marginTop: '10px' }}>
                    Sign Up
                </Button>
            </form>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbar.message}
            />
        </Container>
    );
}

export default Login;
