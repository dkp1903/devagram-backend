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

//routes
app.use("/api/auth", require("./router/auth"));
app.use("/api/profile", require("./router/profile"));

app.listen(port, () => {
  console.log(`App is running on port : ${port}`);
});
