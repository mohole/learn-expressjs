const mysql = require('mysql');

/**
 * Configure MySQL connection unsing the data written in the .env file
 */
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect();

module.exports = connection;