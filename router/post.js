const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const upload=require('../utils/multer')

//middleware
const requireLogin = require("../middlewares/requireLogin");
const middleware=[requireLogin,upload.single("image")] //here "image" is the attribute of the file name="image"
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
} = require("../controllers/post.controller");

/**
 * route : POST /api/post
 * access : Private
 * desc: Add post
 */
router.post(
  "/",
  middleware,
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
router.get("/:id", requireLogin, getPost);

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

module.exports = router;
