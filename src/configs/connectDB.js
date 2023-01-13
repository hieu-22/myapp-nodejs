const mysql = require('mysql2/promise');

// create the connection to database
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '@Email123',
  database: 'record_company',
});

module.exports = pool