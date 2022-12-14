const jwt = require("jsonwebtoken");

require('dotenv').config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) return res.sendStatus(401);
  console.log('Auth Header: ', authHeader);

  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, data) => {
    if (error) return res.sendStatus(403);

    req.user = data.id;
    next();
  });
};

module.exports = {
  verifyJWT
}