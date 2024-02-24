import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, Container, List, ListItem, ListItemText } from '@mui/material';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [fetchId, setFetchId] = useState('');
  const [fetchedItem, setFetchedItem] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/items/')
      .then(response => setItems(response.data))
      .catch(error => console.error('There was an error fetching the items: ', error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8000/api/items/', { name, description })
      .then(response => {
        setItems([...items, response.data]);
        setName('');
        setDescription('');
      })
      .catch(error => console.error('There was an error posting the item: ', error));
  };

  const handleDelete = (itemId) => {
    axios.delete(`http://localhost:8000/api/items/${itemId}/`)
      .then(() => setItems(items.filter(item => item.id !== itemId)))
      .catch(error => console.error('There was an error deleting the item: ', error));
  };

  const handleFetchById = (event) => {
    event.preventDefault();
    axios.get(`http://localhost:8000/api/items/${fetchId}/`)
      .then(response => setFetchedItem(response.data))
      .catch(error => {
        console.error('There was an error fetching the item: ', error);
        setFetchedItem(null);
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
            id="name"
            label="Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="description"
            label="Description"
            id="description"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Submit
          </Button>
        </Box>
        <List>
          {items.map(item => (
            <ListItem
              key={item.id}
              secondaryAction={
                <Button edge="end" onClick={() => handleDelete(item.id)}>
                  Delete
                </Button>
              }>
              <ListItemText primary={item.name} secondary={item.description} />
            </ListItem>
          ))}
        </List>
        <Box component="form" onSubmit={handleFetchById} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="fetchId"
            label="Fetch Item by ID"
            id="fetchId"
            value={fetchId}
            onChange={(e) => setFetchId(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Fetch
          </Button>
        </Box>
        {fetchedItem && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Fetched Item Details
            </Typography>
            <Typography>ID: {fetchedItem.id}</Typography>
            <Typography>Name: {fetchedItem.name}</Typography>
            <Typography>Description: {fetchedItem.description}</Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default App;
