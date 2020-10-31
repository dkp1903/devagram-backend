require("dotenv").config();
const express = require("express");

const app = express();
const port = process.env.PORT || 9999;
const connectToDatabase = require("./config/dbConfig");
const cors = require("cors");

connectToDatabase();

app.use(cors());
app.use(
  express.json({
    extended: false,
  })
);

app.get("/api", (req, res) => {
  res.send("API running");
});

/**
 * All apis
 * There are two types of apis
    1. Public
    2. Private
 * Public are available for not-authenticated user ( no need of requireLogin middleware )
 * Private are available to only Authenticate user ( need of requireLogin middleware )
 */
app.use("/api/auth", require("./router/auth"));
app.use("/api/profile", require("./router/profile"));
app.use("/api/story", require("./router/story"));

app.listen(port, () => {
  console.log(`App is running on port : ${port}`);
});
