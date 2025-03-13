import pool from './src/config/db.js';

async function testConnection() {
    try {
        const result = await pool.query('SELECT NOW()');
        console.log('✅ Database Time:', result.rows[0]);
    } catch (error) {
        console.error('❌ Database Error:', error);
    }
}

testConnection();
