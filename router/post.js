const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");

//middleware
const requireLogin = require("../middlewares/requireLogin");

//controllers
const { addPost } = require("../controllers/post.controller");

/**
 * route : POST /api/post
 * access : Private
 * desc: Add post
 */
router.post(
  "/",
  requireLogin,
  [
    check("img", "image is required").isURL(),
    check("content", "content is required").not().isEmpty(),
  ],
  addPost
);

module.exports = router;
