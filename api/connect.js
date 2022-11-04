const Pool = require("pg").Pool;
const db = new Pool({
    user: "matt",
    host: "localhost",
    database: "social_manager",
    password: "password",
    port: 5432,
});

module.exports = db;
