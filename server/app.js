const express = require('express');
const path = require('path');
const fs = require('fs');
const corsMiddleware = require('./src/middleware/cors');
const formRoutes = require('./src/routes/formRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(corsMiddleware);
app.use(express.json());

// Request logging
app.use((req, res, next) => {
    console.log(`[Passenger] ${req.method} ${req.url}`);
    next();
});

// Routes
app.use('/api', formRoutes);
app.use('/', formRoutes);

// Health check
app.get('/health', (req, res) => res.json({ status: 'OK', type: 'Passenger' }));
app.get('/', (req, res) => {
    res.json({ 
        success: true,
        message: 'Think Outsource API (Passenger Native) is online',
        time: new Date().toISOString()
    });
});

// Start server
const server = app.listen(port, () => {
    console.log(`Passenger server listening on port ${server.address().port}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.warn(`[Passenger Notice] Port ${port} is already in use. This usually means Passenger is already running your app.`);
    } else {
        console.error('[Server Error]', err);
    }
});
