const Pool = require("pg").Pool;
const pool = new Pool({
  user: "matt",
  host: "localhost",
  database: "social_manager",
  password: "password",
  port: 5432,
});

const createUser = (name, email) => {
  pool.query(
    "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
    [name, email],
    (error, result) => {
      if (error) {
        throw error;
      }
      return result.rows[0].id;
    }
  );
};

module.exports = {
  createUser,
};
