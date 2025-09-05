const express = require('express');   //require('express'): Import the Express module
const app = express(); //express(): Create an Express application
const port = 3000; 

app.get('/', (req, res) => {   //app.get(): Define a route for GET requests
  res.send('Hello from Your Localcomputer Sahil , <br> this is just a demo server');
});

app.listen(port, () => {   //app.listen(): Start the server on a specific port
  console.log(`Server running on : http://localhost:${port}`);
});

// click to know :https://codepen.io/aldrin7/full/JoYeVrY
// HTTP Methods:
// RESTful conventions: Use appropriate HTTP methods
// Consistent naming: Use plural nouns for resources
// Status codes: Return appropriate HTTP status codes
// Error handling: Handle errors gracefully
app.get('/api/users', (req, res) => {     
res.json({ users: [] });
});
// POST - Create data
app.post('/api/users', (req, res) => {
res.json({ message: 'User created' });
});
// PUT - Update data
app.put('/api/users/:id', (req, res) => {
res.json({ message: 'User updated' });
});
// DELETE - Remove data
app.delete('/api/users/:id', (req, res) => {
res.json({ message: 'User deleted' });
});

// Route Parameters:
// Access route parameters
app.get('/api/users/:id', (req, res) => {
const userId = req.params.id;
res.json({ userId, message: 'User found' });
});
// Query parameters 
app.get('/api/search', (req, res) => {
const query = req.query.q;
res.json({ query, results: [] });
});