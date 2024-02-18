import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';

function App() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('/api/items/')
            .then(response => response.json())
            .then(data => setItems(data));
    }, []);

    return (
        <div>
            <form>
                <TextField label="Name" variant="outlined" />
                <TextField label="Description" variant="outlined" multiline rows={4} />
                <Button variant="contained" color="primary">Submit</Button>
            </form>
            <ul>
                {items.map(item => (
                    <li key={item.id}>{item.name}: {item.description}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
