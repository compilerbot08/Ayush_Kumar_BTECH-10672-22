/*
 * Main server entry point
 * Sets up Express app with middleware and routes
 */

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');

// load env vars first
dotenv.config();

const app = express();

// connect to mongodb
connectDB();

// middleware setup
app.use(cors());
app.use(express.json());

// basic health check route
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// routes
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/users', require('./src/routes/userRoutes'));
app.use('/api/tasks', require('./src/routes/taskRoutes'));

// global error handler
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(err.statusCode || 500).json({
        success: false,
        error: {
            message: err.message || 'Internal server error',
            code: err.code || 'SERVER_ERROR'
        }
    });
});

const PORT = process.env.PORT || 5000;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
