const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const upload = require("../utils/multer");

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
  upload.single("image"),
  [check("content", "content is required").not().isEmpty()],
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
 * route : GET /api/post/comments/:id
 * access : Private
 * desc: GET all comments`
 */
router.get("/comments/:id", requireLogin, getAllComments);

/**
 * route : GET /api/post/likes/:id
 * access : Private
 * desc: GET all likes`
 */
router.get("/likes/:id", requireLogin, getAllLikes);

/**
 * route : PUT /api/post/:id/likes/like
 * access : Private
 * desc: like post`
 */
router.put("/likes/like/:id", requireLogin, postLike);

/**
 * route : PUT /api/post/:id/likes/unLike
 * access : Private
 * desc: like post`
 */
router.put("/likes/unLike/:id", requireLogin, postUnlike);

/**
 * route : PUT /api/post/:id/comments
 * access : Private
 * desc: comment post`
 */
router.put(
  "/comments/:id",
  [check("text", "text in comment is required").not().isEmpty()],
  requireLogin,
  postComment
);

module.exports = router;
