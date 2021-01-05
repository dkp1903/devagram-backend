// Routes for logged in user's profile
const User = require("../models/user_schema");
const Post = require("../models/post_schema");
const Story = require("../models/story_schema");

const showError = require("../utils/showError");
const bcrypt = require("bcryptjs");

const getProfile = async (req, res) => {
  return res.status(200).json({
    user: req.user,
  });
};

const editUser = async (req, res) => {
  /**
   * update user but check new email and username must be unique
   * Password is required to update user
   * You cannot set newPassword same as current password
   */
  const {
    name,
    username,
    email,
    description,
    devrole,
    password,
    newPassword,
  } = req.body;
  const user = req.user;
  try {
    const userExist = await User.findOne({ $or: [{ email }, { username }] });
    if (userExist) {
      /**
       * checks if user with new username or new email already exist or not
       */
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

    /**
     * updates user according to data provided
     */
    if (name) user.name = name;
    if (username) user.username = username;
    if (email) user.email = email;
    if (description) user.description = description;
    if (devrole) user.devrole = devrole;
    if (newPassword) {
      /**
       * Change password logic
       */
      if (password === newPassword) {
        return res.status(400).json({
          error: "password and newPassword cannot be same",
        });
      }
      if (newPassword.length < 8 || newPassword.length > 32) {
        return res.status(400).json({
          error: "newPassword length must be between 8-32",
        });
      }
      user.password = newPassword;
      const sault = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, sault);
    }

    await user.save();

    return res.status(200).json({
      user: user,
    });
  } catch (error) {
    showError(error, res);
  }
};

/**
 * Password is required to delete the user
 */
const deleteProfile = async (req, res) => {
  const user = req.user;
  try {
    const currentUser = await User.findByIdAndDelete(user.id);
    if (!currentUser) {
      return res.status(404).json({
        error: "User not found",
      });
    } else {
      await Post.findOneAndDelete({ user: currentUser.id });
      await Story.findOneAndDelete({ user: currentUser.id });
    }

    res.status(200).json({
      message: "User Deleted",
    });
  } catch (error) {
    showError(error, res);
  }
};

module.exports = {
  getProfile,
  editUser,
  deleteProfile,
};
