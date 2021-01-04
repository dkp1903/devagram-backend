const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
//controllers
const { signIn, signUp, authUser } = require("../controllers/auth.controller");

//middlewares
const requireLogin = require("../middlewares/requireLogin");

/**
 * route : POST /api/auth
 * access : Private
 * desc: get Auth user
 */
router.get("/", requireLogin, authUser);

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
