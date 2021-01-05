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

/**
 * route : GET /api/profile
 * access : private
 * desc: get user profile
 */
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

module.exports = router;
