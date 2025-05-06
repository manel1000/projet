// app.js
require('dotenv').config(); // For environment variables (npm install dotenv)
const express = require('express');
const cors = require('cors'); // If your frontend is on a different domain (npm install cors)

const statisticsRoutes = require('./routes/statistiqueRoutes');
// Import other routes as you create them
// const studentRoutes = require('./routes/studentRoutes');
// const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT =  3000;

// Middleware
app.use(cors()); // Enable CORS for all routes (configure as needed for security)
app.use(express.json()); // To parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded request bodies

// Basic Route for testing
app.get('/', (req, res) => {
    res.send('Backend server is running!');
});

// API Routes
app.use('/api/statistics', statisticsRoutes);
// app.use('/api/students', studentRoutes);
// app.use('/api/auth', authRoutes);
// ... other routes

// Global error handler (optional, but good practice)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({
        success: false,
        message: 'Something broke!',
        error: err.message // Be cautious about sending detailed errors to the client in production
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    // You might want to test the DB connection once the server starts
    // require('./config/db').testConnection(); // If you exported and want to call testConnection
});