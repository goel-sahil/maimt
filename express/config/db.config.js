// config/db.config.js
const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'app',
    password: 'root',
    database: 'test',
});

module.exports = pool;
