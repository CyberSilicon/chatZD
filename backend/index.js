const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8000;

app.use(cors());

// // Middleware
// app.use(express.json());

// Basic route
app.get('/api/home', (req, res) => {
    res.json({ message: 'Welcome to the backend server!' })
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});