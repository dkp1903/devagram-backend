const express = require("express");
const router = express.Router();
const requireLogin = require("../middlewares/requireLogin");

const { getUser } = require("../controllers/user.controller");

/**
 * route : GET /api/user/user/:id
 * access : Private
 * desc: Get a user with id
 */
router.get("/user/:id", requireLogin, getUser);

module.exports = router;
