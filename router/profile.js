const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const Post = require("../models/post_schema");

//controllers
const {
  getProfile,
  editUser,
  deleteProfile,
} = require("../controllers/profile.controller");

//middleware
const requireLogin = require("../middlewares/requireLogin");
const checkPassword = require("../middlewares/checkPassword");

//error handler
const showError = require("../config/showError");

router.get("/", requireLogin, getProfile);

/**
 * route : PUT /api/profile
 * access : private
 * desc: Update user
 */
router.put(
  "/",
  requireLogin,
  [check("password", "password is required").exists()],
  checkPassword,
  editUser
);

/**
 * route : DELETE /api/profile
 * access : Private
 * desc: Delete user
 */
router.delete(
  "/",
  requireLogin,
  [check("password", "password is required to delete account").exists()],
  checkPassword,
  deleteProfile
);

router.post("/createPost", requireLogin, async (req, res) => {
  const { content, img } = req.body;
  if (!content || !img) {
    return res.status(422).json({ err: "Please add all the fields!" });
  }
  try {
    req.user.password = undefined; //to prevent it from getting stored in the "user" field
    const post = new Post({
      content: content,
      img: img, //this would be the url for image stored in the cloud
      user: req.user,
    });
    const result = await post.save();
    res
      .status(200)
      .json({ post: result, message: "Post uploaded successfully !" });
  } catch (error) {
    showError(error, res);
  }
});

module.exports = router;
