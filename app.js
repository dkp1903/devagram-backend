require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 9999;

require('./models/schema')

mongoose.connect(process.env.MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Mongoose Atlas connected !!!");
});

mongoose.connection.on("error", (error) => {
  console.log("OOPS !! Problem in connecting Mongoose atlas !!", error);
});

app.listen(port, () => {
  console.log(`App is running on port : ${port} !!`);
});
