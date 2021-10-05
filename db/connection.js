const mongoose = require("mongoose");
require("dotenv").config();
const DB = process.env.DATABASE;
mongoose
  .connect(DB)
  .then(() => {
    console.log(`connection is successful`);
  })
  .catch((e) => {
    console.log("error");
  });
