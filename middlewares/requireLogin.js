/*
 *this is the middleware for authorization and preventing from routing without the registration
 */
const User = require("../models/user_schema");
const jwt = require("jsonwebtoken");
const JWT_TOKEN = process.env.JWT_SECRET;
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      error: "You must be logged in",
    });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, JWT_TOKEN, (err, payload) => {
    if (err) {
      return res.status(401).json({
        error: "You must be logged in",
      });
    }

    const {
      user: { id },
    } = payload;

    User.findById(id)
      .select("-password")
      .then((userData) => {
        if (!user) {
          return;
        }
        req.user = userData;
        next();
      })
      .catch((error) => {
        return res.status(404).json({
          error: "You need to be logged in",
        });
      });
  });
};
