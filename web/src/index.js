const express = require('express');
const path = require('path');
const fs = require('fs');
const corsMiddleware = require('./middleware/cors');
const formRoutes = require('./routes/formRoutes');

// --- NUCLEAR STARTUP LOG ---
try {
    fs.writeFileSync(path.join(__dirname, '..', 'startup.log'), `Modular Server attempt start at ${new Date().toISOString()}\n`);
} catch (e) {}

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(corsMiddleware);
app.use(express.json());

// Request logging
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Mounting Routes - Handle both / and /api
app.use('/api', formRoutes);
app.use('/', formRoutes);

// Health check
app.get('/health', (req, res) => res.json({ status: 'OK', architecture: 'modular' }));
app.get('/test-connectivity', (req, res) => {
    res.json({ success: true, message: "Modular Node.js is reached!", time: new Date().toISOString() });
});

// Root
app.get('/', (req, res) => {
    if (req.url === '/') {
        res.json({ message: 'Think Outsource Modular API is running' });
    }
});

// Start server
const server = app.listen(port, () => {
    const actualPort = server.address().port;
    try {
        fs.writeFileSync(path.join(__dirname, '..', 'port.txt'), actualPort.toString());
    } catch (err) {}
    console.log(`Server listening on port ${actualPort}`);
});
