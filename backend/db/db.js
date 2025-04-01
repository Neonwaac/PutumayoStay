const mysql = require('mysql2');
require("dotenv").config();
const db = mysql.createConnection({
    host: process.env.PUTUMAYOSTAY_DB_HOST,
    user: process.env.PUTUMAYOSTAY_DB_USER,
    password: process.env.PUTUMAYOSTAY_DB_PASSWORD,
    database: process.env.PUTUMAYOSTAY_DB_NAME,
})

module.exports = db;