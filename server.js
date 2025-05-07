// Imports all of the modules that are required by the application.
const express = require('express');
const path = require('path');
const app = express();

// Security headers middleware:
app.use((req, res, next) => {
    // Prevents 'clickjacking'.
    res.setHeader('X-Frame-Options', 'DENY');
    // Protects against Cross-Site Scripting (XSS).
    res.setHeader('X-XSS-Protection', '1; mode=block');
    // Prevents 'MIME type sniffing'.
    res.setHeader('X-Content-Type-Options', 'nosniff');
    // Sets strict transport security.
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    // Set content a security policy.
    res.setHeader('Content-Security-Policy', "default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval'");
    next();
});

// Uses the environment variable for its port, or uses port 8000 if its application is running on a local device.
const PORT = process.env.PORT || 8000;

// Serves static files from the public directory.
app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: (res, path) => {
    if (path.endsWith('manifest.json')) {
      res.setHeader('Content-Type', 'application/manifest+json');
    }
  }
}));

// Handles all routes, by serving the file named 'index.html'.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Listens on the port that is specified by the 'Render' application, or lsitens on the port 8000 if its application is running on a local device.
app.listen(PORT, () => {
  console.log('Server running successfully!');
});
