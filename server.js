const express = require('express');
const path = require('path');
const app = express();
const PORT = 8000;

// Serve static files (images, CSS, JS) under /static
app.use('/static', express.static(path.join(__dirname, 'public')));

// Serve ONLY index.html at root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Centralised_System_Mobile.html'));
});

// Block any other routes
app.use((req, res) => {
  res.status(403).send('Forbidden');
});

app.listen(PORT, () => {
  console.log(`Secure server running at http://localhost:${PORT}`);
});
