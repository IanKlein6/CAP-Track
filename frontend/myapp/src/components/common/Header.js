import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; // Icon for menu button
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../../context/UserContext';

function Header() {
    const { user, setUser } = useUser();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null); // For menu state
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8000/api/logout/', {}, { withCredentials: true });
            setUser(null);
            navigate('/login');          
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={handleMenu}
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={() => { navigate('/dashboard'); handleClose(); }}>Dashboard</MenuItem>
                    <MenuItem onClick={() => { navigate('/profile'); handleClose(); }}>Profile</MenuItem>
                    <MenuItem onClick={() => { navigate('/forums'); handleClose(); }}>Forums</MenuItem>
                    <MenuItem onClick={() => { navigate('/signup'); handleClose(); }}>Sign Up</MenuItem>
                    {/* Add more MenuItem components as needed for additional pages */}
                </Menu>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {user ? user.username : ''}
                </Typography>
                <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
