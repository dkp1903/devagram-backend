const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");

//controllers
const { signIn, signUp } = require("../controllers/auth.controller");

/**
 * route : POST /api/auth/signup
 * access : Public
 * desc: Register user
 */
router.post(
  "/signup",
  [
    check("name", "name is required").not().isEmpty(),
    check("username", "username is required").not().isEmpty(),
    check("password", "password is required. Length should be between 8-32")
      .not()
      .isEmpty()
      .isLength({ max: 32, min: 8 }),
    check("email", "email is required").isEmail(),
    check("description", "description is required").not().isEmpty(),
    check("devrole", "devrole is required").not().isEmpty(),
  ],
  signUp
);

/**
 * route : POST /api/auth/signin
 * access : Public
 * desc: Register user
 */
router.post(
  "/signin",
  [
    check("emailOrUsername", "email or username is required").exists(),
    check("password", "password is required").exists(),
  ],
  signIn
);

module.exports = router;
