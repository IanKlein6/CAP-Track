import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

function Profile() {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        // Add other fields as necessary
    });

    useEffect(() => {
        // Fetch user data on component mount
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/profile/');
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Update user data
            await axios.patch('http://localhost:8000/api/profile/', userData);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile.');
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                User Profile
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="username"
                    value={userData.username}
                    onChange={handleChange}
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="email"
                    type="email"
                    value={userData.email}
                    onChange={handleChange}
                />
                {/* Add other fields as necessary */}
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Update Profile
                </Button>
            </form>
        </Container>
    );
}

export default Profile;
