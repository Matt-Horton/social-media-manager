const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

const queries = require("./queries");

// Middleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello there");
});

app.post("/users", (req, res) => {
  const { name, email } = req.body;

  queries.createUser(name, email);
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
