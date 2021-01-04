const express = require("express");
const router = express.Router();
const requireLogin = require("../middlewares/requireLogin");
const {
  getHackathons,
  createHackathon,
  deleteHackathons,
  updateHackathons,
} = require("../controllers/hackathon.controller");

/**
 * route : GET /api/hackathons
 * access : private
 * desc: get all hackathons
 */
router.get("/", requireLogin, getHackathons);

/**
 * route : POST /api/hackathons
 * access : private
 * desc: create hackathon
 */
router.post("/", requireLogin, createHackathon);

/**
 * route : DELETE /api/hackathons/:id
 * access : private
 * desc: Delete hackathon
 */
router.delete("/:id", requireLogin, deleteHackathons);

/**
 * route : PUT /api/hackathons/:id
 * access : private
 * desc: Update hackathon
 */
router.put("/:id", requireLogin, updateHackathons);

module.exports = router;
