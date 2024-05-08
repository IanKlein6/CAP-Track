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
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8000/api/login/', loginData, { withCredentials: true });
            if (response.status === 200) {
                setUser({ email: loginData.email });
                navigate('/dashboard');
                setSnackbar({ open: true, message: 'Login successful!' });
            }
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Login failed. Please try again.';
            setSnackbar({ open: true, message: errorMessage });
        } finally {
            setLoading(false);
        }
    };

    const handleSignUp = () => {
        navigate('/SignUp');
    };

    const handleCloseSnackbar = () => setSnackbar({ open: false, message: '' });

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
                    autoComplete="email" //auto complete handleing for Browers
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
                    {loading ? <CircularProgress size={24} /> : 'Log In'}
                </Button>
                <Button onClick={handleSignUp} color="secondary" fullWidth style={{ marginTop: '10px' }}>
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
