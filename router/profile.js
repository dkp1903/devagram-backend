const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");

//controllers
const {
  getProfile,
  editUser,
  deleteProfile,
} = require("../controllers/profile.controller");

//middleware
const requireLogin = require("../middlewares/requireLogin");

router.get("/", requireLogin, getProfile);

router.put("/", requireLogin, editUser);

router.delete("/", requireLogin, deleteProfile);

module.exports = router;
