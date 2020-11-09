const User = require("../models/user_schema");

const getUser = (req, res) => {
  User.findOne({ _id: req.params.id })
    .select("-password")
    .select("-_id")
    .select("-email")
    .select("-__v")
    .then((user) => {
      return res.status(200).json({ user });
    })
    .catch((err) => {
      return res.status(404).json({ error: "User not found" });
    });
};

module.exports = {
  getUser,
};
