const dotenv = require("dotenv");

const express = require("express");

const app = express();
const cookieParser = require("cookie-parser");

dotenv.config({ path: "./config.env" });

require("./db/connection");

app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT || 8000;

const User = require("./model/userSchema");

// we link the router files to make our route easy

app.use(require("./router/auth"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/createblog", (req, res) => {
  res.send("Hello from the blog page");
});

app.listen(port, () => {
  console.log("Succesfully listening on port ");
});
