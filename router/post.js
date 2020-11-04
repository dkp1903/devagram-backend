const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");

//middleware
const requireLogin = require("../middlewares/requireLogin");
const checkOriginalUser = require("../middlewares/checkOriginalUser");

//controllers
const {
  addPost,
  getAllPosts,
  getPost,
  postDelete,
} = require("../controllers/post.controller");

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

/**
 * route : GET /api/post
 * access : Public
 * desc: GET posts of all users
 */
router.get("/", getAllPosts);

/**
 * route : GET /api/post
 * access : Private
 * desc: GET single post
 */
router.get("/:id", requireLogin, getPost);

/**
 * route : DELETE /api/post
 * access : Private
 * desc: DELETE post
 */
router.delete("/:id", requireLogin, postDelete);

/**
 * route : PUT /api/post
 * access : Private
 * desc: EDIT post
 */
router.put("/:id", requireLogin, postDelete);

module.exports = router;
