import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../context/UserContext';

function Header() {
    const { user, setUser } = useUser(); // Access user context
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null); // State for controlling the menu anchor

    // Handles opening the menu
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Handles closing the menu
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Handles the logout process
    const handleLogout = async () => {
        try {
            // Attempts to logout via a POST request
            await axios.post('http://localhost:8000/api/logout/', {}, { withCredentials: true });
            setUser(null); // Resets user context
            navigate('/login'); // Redirects to login page          
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <AppBar position="static">
            <Toolbar>
                {/* Displays the username if user is logged in */}
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {user ? user.username : ''}
                </Typography>
                {/* Logout button */}
                <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
