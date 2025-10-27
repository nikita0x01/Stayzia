const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsmate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const app = express();
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");



const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js"); // ✅ new review router
const userRouter = require("./routes/user.js");

const ExpressError = require("./utils/ExpressError");



const dburl = process.env.ATLASDB_URL;

main()
  .then(() => console.log("✅ Connected to MongoDB successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

async function main() {
  await mongoose.connect(dburl);
}

// View Engine Setup
app.engine("ejs", ejsmate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));




// Default title middleware
app.use((req, res, next) => {
  res.locals.title = "Stayzia";
  next();
});


const store = MongoStore.create({
  mongoUrl:dburl,
  crypto:{
    secret:process.env.SECRET
  },
  touchAfter:24 * 3600,
});

store.on("ERROR" , () => {
  console.log("error in mongo session strore");
});

//express-session-cookie
const sessionOptions = {
  store: store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,

  cookie : { 
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000 ,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },

};

// Session and flash first
app.use(session(sessionOptions));
app.use(flash());

//passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Now locals for flash and title
app.use((req , res , next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.info = req.flash("info"); // if needed
  res.locals.currUser = req.user;
  res.locals.title = "Stayzia";
  next();
});


app.get("/demouser",async(req , res) => {

})

// Routes
app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

// ✅ Mount routes
app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter); 
app.use("/", userRouter);// nested route

// Error handling middleware
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error.ejs", { message });
});

// Start server
app.listen(8080, () => {
  console.log("🚀 Server is listening on port 8080");
});

app.post("/subscribe", (req, res) => {
  const { email } = req.body;

  // Basic validation
  if (!email || !email.includes("@")) {
    return res.status(400).send('<h1 style="color:red;"> Invalid email address</h1>');
  }

  // Log or save email (placeholder logic)
  console.log(`New subscription: ${email}`);

  // Respond with a short success message (for in-page popup)
   res.send('<h1 style="color:green;"> Thank you for subscribing!!!</h1>');
});

