import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Snackbar } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserSignUp() {
    const [formData, setFormData] = useState({ email: '', password: '', invitationCode: '' });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/signup/', formData);
            if (response.status === 201) {
                setOpenSnackbar(true);
                navigate('/login'); // Navigate to login on successful sign up
            }
        } catch (error) {
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>Sign Up</Typography>
            <form onSubmit={handleSubmit}>
                <TextField 
                    label="Email" 
                    variant="outlined" 
                    fullWidth 
                    margin="normal" 
                    name="email" 
                    type="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                />
                <TextField 
                    label="Password" 
                    variant="outlined" 
                    fullWidth 
                    margin="normal" 
                    name="password" 
                    type="password" 
                    autoComplete="new-password"
                    value={formData.password} 
                    onChange={handleChange} 
                />
                <TextField 
                    label="Invitation Code" 
                    variant="outlined" 
                    fullWidth 
                    margin="normal" 
                    name="invitationCode" 
                    value={formData.invitationCode} 
                    onChange={handleChange} 
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Sign Up
                </Button>
            </form>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} message="User created successfully or failed to create user!" />
        </Container>
    );
}

export default UserSignUp;
