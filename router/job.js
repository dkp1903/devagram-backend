const express = require("express");
const router = express.Router();
const requireLogin = require("../middlewares/requireLogin");
const {
  getJobs,
  createJob,
  deleteJob,
  updateJob,
} = require("../controllers/job.controller");

/**
 * route : GET /api/jobs
 * access : private
 * desc: get all jobs
 */
router.get("/", requireLogin, getJobs);

/**
 * route : POST /api/jobs
 * access : private
 * desc: create job
 */
router.post("/", requireLogin, createJob);

/**
 * route : DELETE /api/jobs/:id
 * access : private
 * desc: Delete job
 */
router.delete("/:id", requireLogin, deleteJob);

/**
 * route : PUT /api/jobs/:id
 * access : private
 * desc: Update job
 */
router.put("/:id", requireLogin, updateJob);

module.exports = router;
