const mysql = require('mysql2')
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

//console.log('Database pool created in database:', pool);
module.exports = pool.promise();