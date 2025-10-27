const User = require("../models/user");

// Render signup form
module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

// Handle signup logic
module.exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", `Welcome to Stayzia, ${username}!`);
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

// Render login form
module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

// Handle login logic
module.exports.login = (req, res) => {
  const redirectUrl = req.session.redirectUrl || "/listings";
  delete req.session.redirectUrl;

  req.flash("success", `Welcome back, ${req.user.username}!`);
  res.redirect(redirectUrl);
};

// Handle logout
module.exports.logout = (req, res, next) => {
  req.logOut((err) => {
    if (err) return next(err);
    req.flash("success", "You are Logged Out!");
    res.redirect("/listings");
  });
};
