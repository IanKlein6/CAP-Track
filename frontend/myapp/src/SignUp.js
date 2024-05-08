import React, { useState } from 'react';
import { TextField, Button, Container, Typography, List, ListItem, ListItemText, Snackbar } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserSignUp() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        invitationCode: '',
    });
    const [users, setUsers] = useState([]);
    const [showUsers, setShowUsers] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();

    // Handle form field changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/signup/', formData);
            if (response.status === 201) {
                setOpenSnackbar(true);
                navigate('/dashboard'); // Navigate to the dashboard on successful sign up
            }
        } catch (error) {
            console.error('There was an error:', error.response || error);
        }
    };

    // Fetch users from the backend
    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/users/');
            setUsers(response.data);
            setShowUsers(true);
        } catch (error) {
            console.error('There was an error fetching the users:', error.response);
        }
    };

    const handleCloseSnackbar = () => setOpenSnackbar(false);

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>Sign Up</Typography>
            <form onSubmit={handleSubmit}>
                {/* Fields for email, password, and invitation code */}
                <TextField 
                    label="Email" 
                    variant="outlined" 
                    fullWidth margin="normal" 
                    name="email" 
                    type="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                />
                <TextField 
                    label="Password" 
                    variant="outlined" 
                    fullWidth margin="normal" 
                    autoComplete="current-password"
                    name="password" 
                    type="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                />
                <TextField 
                    label="Invitation Code" 
                    variant="outlined" 
                    fullWidth margin="normal" 
                    name="invitationCode" 
                    value={formData.invitationCode} 
                    onChange={handleChange} 
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Sign Up
                </Button>
            </form>
            {/* Button to fetch and display users */}
            {showUsers && (
                <>
                    <Button onClick={fetchUsers} variant="contained" color="secondary" fullWidth style={{ marginTop: '20px' }}>Retrieve Users</Button>
                    <Typography variant="h5" component="h2" style={{ marginTop: '20px' }}>User List</Typography>
                    <List>
                        {users.map(user => (
                            <ListItem key={user.id}>
                                <ListItemText primary={user.username} secondary={user.email} />
                            </ListItem>
                        ))}
                    </List>
                </>
            )}
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} message="User created successfully!" />
        </Container>
    );
}

export default UserSignUp;
