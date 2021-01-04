require("dotenv").config();
const express = require("express");

const app = express();
const port = process.env.PORT || 9999;
const connectToDatabase = require("./config/dbConfig");

const cors = require("cors");

connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`App is running on port : ${port}`);
  });
});

app.use(cors());
if (process.env.NODE_ENV === "development") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

app.use(
  express.json({
    extended: false,
  })
);

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
app.use("/api/post", require("./router/post"));
app.use("/api/user", require("./router/user"));
app.use("/api/hackathons", require("./router/hackathon"));
app.use("/api/jobs", require("./router/job"));

app.use("/", (_, res) => {
  res.status(200).json({
    message: "API Running",
  });
});
