import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../../context/UserContext';

function Header({ username }) {
    const { user, setUser } = useUser();
    const navigate = useNavigate();

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
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="home"
                    sx={{ mr: 2 }}
                    onClick={() => navigate('/dashboard')}
                >
                    <HomeIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {user? user.username : ''}
                </Typography>
                <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
