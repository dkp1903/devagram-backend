const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");

//controllers
const {
  uploadStory,
  getStory,
  deleteStory,
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

module.exports = router;
