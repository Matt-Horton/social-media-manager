const Pool = require("pg").Pool;
const db = new Pool({
  user: "postgres",
  host: "containers-us-west-117.railway.app",
  database: "railway",
  password: "BR5h3W4TCSxH1mWxmFUY",
  port: 5923,
});

module.exports = db;
