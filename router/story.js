const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");

//controllers
const { uploadStory, getStory } = require("../controllers/story.controller");

//middlewares
const requireLogin = require("../middlewares/requireLogin");

/**
 * route : POST /api/story
 * access : Private
 * desc: Register user
 */
router.post(
  "/",
  requireLogin,
  [check("imageUrl", "imageUrl is required").exists()],
  uploadStory
);

/**
 * route : POST /api/story
 * access : Private
 * desc: Register user
 */
router.get("/", requireLogin, getStory);

module.exports = router;
