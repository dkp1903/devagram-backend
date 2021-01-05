const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");

//controllers
const {
  uploadStory,
  getStory,
  deleteStory,
  getAllStory,
  getOtherUserStory,
  getAllStoryOfUser,
} = require("../controllers/story.controller");

//middlewares
const checkUserExist = require("../middlewares/checkUserExist");
const requireLogin = require("../middlewares/requireLogin");
const upload = require("../utils/multer");

/**
 * route : POST /api/story
 * access : Private
 * desc: create story
 */
router.post("/", requireLogin, upload.single("image"), uploadStory);

/**
 * route : GET /api/story/me
 * access : Private
 * desc: GET story of all users
 */
router.get("/me", requireLogin, getAllStory);

/**
 * route : GET /api/story/:id
 * access : Private
 * desc: get story
 */
router.get("/:id", requireLogin, getStory);

/**
 * route : DELETE /api/story/:id
 * access : Private
 * desc: Delete story
 */
router.delete("/:id", requireLogin, deleteStory);

/**
 * route : GET /api/story/user/:userId
 * access : Private
 * desc: Get all story of other user
 */
router.get("/user/:userId", requireLogin, checkUserExist, getAllStoryOfUser);

/**
 * route : GET /api/story/:userId/:storyId
 * access : Private
 * desc: Get other user's story
 */
router.get(
  "/:userId/:storyId",
  requireLogin,
  checkUserExist,
  getOtherUserStory
);

module.exports = router;
