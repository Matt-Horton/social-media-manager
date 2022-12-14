const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST;
const authRoutes = require("./auth/routes");
const { verifyJWT } = require("./middleware/verifyJWT");

require('dotenv').config();

// Middleware
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(
  cors({
    origin: "https://localhost:3000",
  })
);
app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello there");
});

app.get('/public', (req, res) => {
  res.send('Open to the public');
});

app.get('/private', verifyJWT, (req, res) => {
  res.send('You should only see this if you\'re logged in');
});

app.post("/users", (req, res) => {
  const { name, email } = req.body;

  queries.createUser(name, email);
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
