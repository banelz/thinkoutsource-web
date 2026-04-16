const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'thinkoutsource',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test connection on startup
pool.getConnection()
    .then(conn => {
        console.log('[DB] Connected successfully');
        conn.release();
    })
    .catch(err => {
        console.error('[DB] Connection failed:', err.message);
    });

module.exports = pool;
