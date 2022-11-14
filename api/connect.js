const Pool = require("pg").Pool;
require('dotenv').config();

const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

db.on('connect', client => {
  console.log('Connected to DB');
});

db.on('error', (error, client) => {
  console.log('Client Password: ', process.env.DB_PASSWORD);
  console.log('DB Error: ', error);
});

module.exports = db;
