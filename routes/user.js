const express = require("express");
const router = express.Router();
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync");
const { saveRedirectUrl } = require("../middleware");
const users = require("../controllers/user");

// Signup routes
router
  .route("/signup")
  .get(users.renderSignupForm)
  .post(wrapAsync(users.signup));

// Login routes
router
  .route("/login")
  .get(users.renderLoginForm)
  .post(
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: "Invalid username or password.",
    }),
    users.login
  );

// Logout route
router.get("/logout", users.logout);

module.exports = router;

