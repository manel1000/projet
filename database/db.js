// config/db.js
const mysql = require('mysql2/promise'); // Using mysql2 promise wrapper

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost', // Use environment variables for sensitive data
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'manel@2005',
    database: process.env.DB_NAME || 'projet',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test the connection (optional)
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Successfully connected to the database.');
        connection.release();
    } catch (error) {
        console.error('Error connecting to the database:', error);
        // Exit the process if the DB connection fails, or handle appropriately
        process.exit(1);
    }
}

// Call testConnection when the application starts if you want to ensure DB is up
// testConnection();

module.exports = pool;