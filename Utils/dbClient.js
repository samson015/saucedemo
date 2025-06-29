// dbClient.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'qa_automation',
  password: 'your_password', // ⬅️ Replace with your actual password
  port: 5432,
});

pool.connect()
  .then(() => console.log('✅ Connected to PostgreSQL'))
  .catch(err => console.error('❌ Database connection failed:', err.message));

module.exports = pool;
