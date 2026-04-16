const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
const corsMiddleware = require('./src/middleware/cors');
app.use(corsMiddleware);
app.use(express.json());

// Routes
const formRoutes = require('./src/routes/formRoutes');
app.use('/api', formRoutes);
app.use('/', formRoutes);

// Health check
app.get('/health', (req, res) => res.json({ status: 'OK', type: 'Standalone' }));
app.get('/', (req, res) => {
    res.json({ 
        message: 'Think Outsource API is running', 
        endpoints: ['/health', '/api/submit_contact', '/api/submit_career', '/api/submit_debt', '/api/update_lead'] 
    });
});

// Start the server
const server = app.listen(port, () => {
    console.log(`Server listening on port ${server.address().port}`);
});
