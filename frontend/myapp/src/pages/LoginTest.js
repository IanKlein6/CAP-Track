import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Snackbar } from '@mui/material';
import axios from 'axios';

function LogInTest() {
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    }); 
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/login/', loginData);
            console.log('Login successful:', response.data);
            if (response.status === 200) {
                // Assuming status code 200 means success
                setOpenSnackbar(true); // Show success snackbar only if login is successful
                // Redirect the user or perform other actions on successful login
            }
        } catch (error) {
            console.error('There was an error logging in:', error.response);
            // Here, you should handle login failure
            // For example, you could show a different Snackbar message indicating the failure
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

            Success Message Snackbar
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message="Login successful!"
            />
        </Container>
    );
}

export default LogInTest;
