const express = require('express');
const path = require('path');
const app = express();

// Use the environment variable for the port or default to 8000 if running locally
const PORT = process.env.PORT || 8000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html at root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Block any other routes
app.use((req, res) => {
  res.status(403).send('Forbidden');
});

// Listen on the port specified by Render or 8000 locally
app.listen(PORT, () => {
  console.log('Server running successfully!');
});
