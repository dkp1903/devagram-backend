const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");

//middleware
const requireLogin = require("../middlewares/requireLogin");

//controllers
const {
  addPost,
  getAllPosts,
  getPost,
  postDelete,
  postEdit,
  getAllComments,
  getAllLikes,
  postLike,
  postUnlike,
  postComment,
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
router.get("/", requireLogin, getAllPosts);

/**
 * route : GET /api/post/:id
 * access : Private
 * desc: GET single post
 */
router.get("/:id", getPost);

/**
 * route : DELETE /api/post/:id
 * access : Private
 * desc: DELETE post
 */
router.delete("/:id", requireLogin, postDelete);

/**
 * route : PUT /api/post/:id
 * access : Private
 * desc: EDIT post`
 */
router.put("/:id", requireLogin, postEdit);

/**
 * route : GET /api/post/:id/comments
 * access : Private
 * desc: GET all comments`
 */
router.get("/:id/comments", requireLogin, getAllComments);

/**
 * route : GET /api/post/:id/likes
 * access : Private
 * desc: GET all likes`
 */
router.get("/:id/likes", requireLogin, getAllLikes);

/**
 * route : PUT /api/post/:id/likes/handleLikes
 * access : Private
 * desc: like post`
 */
router.put("/:id/likes/like", requireLogin, postLike);

/**
 * route : PUT /api/post/:id/likes/handleLikes
 * access : Private
 * desc: like post`
 */
router.put("/:id/likes/unlike", requireLogin, postUnlike);

/**
 * route : PUT /api/post/:id/likes/handleLikes
 * access : Private
 * desc: like post`
 */
router.put("/:id/comments", requireLogin, postComment);

module.exports = router;
