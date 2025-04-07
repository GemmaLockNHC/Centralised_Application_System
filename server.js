const express = require('express');
const path = require('path');
const app = express();

// Use the environment variable for the port or default to 8000 if running locally
const PORT = process.env.PORT || 8000;

// Serve static files (images, CSS, JS) under /static
app.use('/static', express.static(path.join(__dirname, 'public')));

// Serve ONLY index.html at root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Centralised_System.html'));
});

// If you have a mobile version or another route, add it here
app.get('/mobile', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Centralised_System_Mobile.html'));
});

// Block any other routes
app.use((req, res) => {
  res.status(403).send('Forbidden');
});

// Listen on the port specified by Render or 8000 locally
app.listen(PORT, () => {
  console.log(`Secure server running at http://localhost:${PORT}`);
});
