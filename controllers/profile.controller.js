const User = require("../models/user_schema");
const showError = require("../config/showError");

const getProfile = async (req, res) => {
  return res.status(200).json({
    user: req.user,
  });
};

const editUser = async (req, res) => {
  const { name, username, email, description, devrole } = req.body;
  const user = req.user;
  try {
    //update use but check new email and username must be unique
    const userExist = await User.findOne({ $or: [{ email }, { username }] });
    if (userExist) {
      if (
        !(
          (user.username === username && user.email === email) ||
          (user.username === username && !email) ||
          (user.email === email && !username)
        )
      ) {
        return res.status(400).json({
          error:
            userExist.email.toLowerCase() === email.toLowerCase() &&
            email.toLowerCase() !== user.email.toLowerCase()
              ? "User with this email already exists"
              : "User with this username already exists",
        });
      }
    }
    if (name) user.name = name;
    if (username) user.username = username;
    if (email) user.email = email;
    if (description) user.description = description;
    if (devrole) user.devrole = devrole;
    await user.save();

    return res.status(200).json({
      user: user,
    });
  } catch (error) {
    showError(error, res);
  }
};

module.exports = {
  getProfile,
  editUser,
};
