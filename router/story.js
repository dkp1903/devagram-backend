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
} = require("../controllers/story.controller");

//middlewares
const requireLogin = require("../middlewares/requireLogin");

/**
 * route : POST /api/story
 * access : Private
 * desc: create user
 */
router.post(
  "/",
  requireLogin,
  [check("imageUrl", "imageUrl is required").isURL()],
  uploadStory
);

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
 * route : GET /api/story/:userId/:storyId
 * access : Private
 * desc: Get other user's story
 */
router.get("/:userId/:storyId", requireLogin, getOtherUserStory);

module.exports = router;
