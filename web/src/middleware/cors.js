const corsMiddleware = (req, res, next) => {
    const origin = req.headers.origin;
    const allowedOrigins = [
        'https://thinkoutsource.co.za',
        'https://www.thinkoutsource.co.za',
        'http://localhost:5173',
        'http://localhost:3000'
    ];

    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Vary', 'Origin');
    } else {
        // Fallback or restrictive default
        res.setHeader('Access-Control-Allow-Origin', 'https://thinkoutsource.co.za');
    }
    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours
        return res.status(204).end();
    }
    next();
};

module.exports = corsMiddleware;
