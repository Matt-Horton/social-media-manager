const db = require("../connect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require('dotenv').config();

const signUp = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const USERNAME_EXISTS_QUERY = "SELECT FROM users WHERE email = $1";

  db.query(USERNAME_EXISTS_QUERY, [username], (error, data) => {
    if (error) res.status(500).json(error);

    if (data.rows.length > 0) {
      return res.status(409).json({
        message: "A user with that username already exists",
      });
    }
  });

  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);
  // now we set user password to hashed password
  const hashedPassword = await bcrypt.hash(password, salt);

  const CREATE_NEW_USER_QUERY =
    "INSERT INTO users(email, password) VALUES($1, $2) RETURNING *";

  db.query(
    CREATE_NEW_USER_QUERY,
    [username, hashedPassword],
    (error, data) => {
      if (error) return res.status(500).json(error);

      return res.status(201).json(data.rows[0]);
    }
  );
};

const signIn = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log("Username: ", username);
  console.log("Password: ", password);

  const GET_USER_BY_USERNAME_QUERY =
    "SELECT * FROM users WHERE email = $1";
  db.query(GET_USER_BY_USERNAME_QUERY, [username], async (error, data) => {
    if (error) return res.status(500).json(data);

    if (data.rows.length === 0) {
      console.log("Username doesn't exist");
      return res.status(404).json({
        message: "A user with that username doesn't exist",
      });
    }

    const validPassword = await bcrypt.compare(
      password,
      data.rows[0].password
    );

    if (!validPassword)
      return res.status(400).json({ error: "Invalid Password" });

    const accessToken = jwt.sign({ id: data.rows[0].id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1800s",
    });
    const refreshToken = jwt.sign({ id: data.rows[0].id }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });

    const { id, username } = data.rows[0];

    const INSERT_REFRESH_TOKEN =
      "UPDATE users SET refresh_token = $1 WHERE id = $2";
    db.query(INSERT_REFRESH_TOKEN, [refreshToken, id], async (error, data) => {
      console.log('Inserted Refresh Token: ', data);
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    })
      .status(200)
      .json({
        id: id,
        username: username,
        accessToken: accessToken
      });
  });
};

const refreshToken = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.refreshToken) return res.sendStatus(401);

  console.log('Cookies: ', cookies.refreshToken);

  const refreshToken = cookies.refreshToken;
  console.log('Refresh token: ', refreshToken);
  const FIND_USER_BY_REFRESH_TOKEN = "SELECT * FROM users WHERE refresh_token = $1;";
  db.query(FIND_USER_BY_REFRESH_TOKEN, [refreshToken], (error, data) => {

    if (data.rows.length === 0) return res.sendStatus(403);

    console.log('Found User: ', data.rows[0]);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, decodedJWT) => {
      if (error || decodedJWT.id !== data.rows[0].id) return res.sendStatus(403);
      const newAccessToken = jwt.sign({ id: data.rows[0].id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1800s",
      });

      res.json({ id: data.rows[0].id, accessToken: newAccessToken });
    })
  })
}

const logout = (req, res) => {
  res.clearCookie("accessToken", {
    secure: true,
    sameSite: "none",
  })
    .status(200)
    .json({
      message: "User has been logged out",
    });
};

module.exports = {
  signUp,
  signIn,
  logout,
  refreshToken,
};
