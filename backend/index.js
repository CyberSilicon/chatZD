const express = require('express');
const app = express();
const PORT = 8000;

// Middleware
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to the backend server!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});