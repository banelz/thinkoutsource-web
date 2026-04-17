const mysql = require('mysql2/promise');

async function migrate() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'thinkoutsource'
    });

    console.log('Connected to MySQL');
    
    // Check if column already exists to prevent error on re-run
    const [columns] = await connection.query('SHOW COLUMNS FROM debt_leads LIKE "service_interest"');
    if (columns.length === 0) {
        await connection.query('ALTER TABLE debt_leads ADD COLUMN service_interest VARCHAR(255) AFTER email');
        console.log('Migration successful: service_interest column added to debt_leads');
    } else {
        console.log('Migration skipped: service_interest column already exists');
    }

    await connection.end();
}

migrate().catch(err => {
    console.error('Migration failed:', err);
    process.exit(1);
});
