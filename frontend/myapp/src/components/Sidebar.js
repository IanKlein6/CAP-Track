import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ForumIcon from '@mui/icons-material/Forum';
import PersonIcon from '@mui/icons-material/Person';
import './Sidebar.css';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Define the menu items with their respective icons and paths
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
    { text: 'Forum', icon: <ForumIcon />, path: '/forum' },
  ];

  return (
    <List>
      {menuItems.map((item) => (
        <ListItem 
          button
          key={item.text}
          onClick={() => navigate(item.path)}
          selected={location.pathname === item.path ? 'selectedItem' : ''} // Highlight the current path
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
  );
}

export default Sidebar;
