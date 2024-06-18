import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  List,
  ListItem,
  ListItemText,
  Paper,
  Alert
} from '@mui/material';

function Forum() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [searchName, setSearchName] = useState('');
  const [fetchedItem, setFetchedItem] = useState([]);
  const [errorMessage, setErrorMessage] = useState(''); // State for the error message

  // Fetch items from the backend
  useEffect(() => {
    axios.get('http://localhost:8000/api/test/items/')
      .then(response => setItems(response.data))
      .catch(error => console.error('There was an error fetching the items: ', error));
  }, []);

  // Handle item submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const newItem = { name, description };
    axios.post('http://localhost:8000/api/test/items/', newItem)
      .then(response => {
        setItems([...items, response.data]);
        setName('');
        setDescription('');
      })
      .catch(error => console.error('There was an error posting the item: ', error));
  };

  // Handle item deletion
  const handleDelete = (itemId) => {
    axios.delete(`http://localhost:8000/api/test/items/${itemId}/`)
      .then(() => setItems(items.filter(item => item.id !== itemId)))
      .catch(error => console.error('There was an error deleting the item: ', error));
  };

  // Fetch an item by name
  const handleSearchByName = (event) => {
    event.preventDefault();
    setErrorMessage(''); // Clear any previous error message
    axios.get(`http://localhost:8000/api/items/name/?name=${searchName}`)
      .then(response => {
        setFetchedItem(response.data);
        if (response.data.length === 0) {
          setErrorMessage('Name not available. Please enter a valid name.');
        }
      })
      .catch(error => {
        console.error('There was an error fetching the items by name: ', error);
        setFetchedItem([]);
        setErrorMessage('Name not available. Please enter a valid name.');
      });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Items
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Description"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
            Submit
          </Button>
        </Box>
        <List>
          {items.map(item => (
            <ListItem
              key={item.id}
              secondaryAction={
                <Button variant="outlined" color="error" onClick={() => handleDelete(item.id)}>
                  Delete
                </Button>
              }>
              <ListItemText primary={item.name} secondary={item.description} />
            </ListItem>
          ))}
        </List>
        <Box component="form" onSubmit={handleSearchByName} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Fetch Item by Name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
            Fetch
          </Button>
        </Box>
        {errorMessage && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errorMessage}
          </Alert>
        )}
        {fetchedItem.length > 0 && (
          <Paper elevation={3} sx={{ p: 2, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Fetched Item Details
            </Typography>
            <List>
              {fetchedItem.map(item => (
                <ListItem key={item.id}>
                  <ListItemText primary={item.name} secondary={item.description} />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}
      </Box>
    </Container>
  );
}

export default Forum;
