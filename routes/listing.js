const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");
const { listingSchema } = require("../schema");
const ExpressError = require("../utils/ExpressError");
const {isLoggedIn} = require("../middleware.js");
const listingControllers = require("../controllers/listing.js");
const multer = require('multer');
const upload = multer({dest:'uploads/'});


// Validate Listing Middleware
const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};



// Index Route
router.get("/", wrapAsync(listingControllers.index));

// New Listing Form
router.get("/new",isLoggedIn, (req, res) => {
  res.render("listings/new"); // ✅ render the correct EJS template
});

// Show Route
router.get("/:id", wrapAsync(async (req, res) => {
  const listing = await Listing.findById(req.params.id).populate({ path: "reviews" , populate:{path:"author"},}).populate("owner");
  if(!listing) {
    req.flash("error" , "Listing You requested for does not exist");
    res.redirect("/listings");
  }
  console.log(listing);
  res.render("listings/show", { listing });

}));
router.post("/listings", async (req, res) => {
  let { listing } = req.body;

  // Ensure image object exists
  if (!listing.image || !listing.image.url) {
    listing.image = { url: "/image/default.png", filename: "default" };
  }

  const newListing = new Listing(listing);
  await newListing.save();
  res.redirect(`/listings/${newListing._id}`);
});


// Create Route
router.post("/", validateListing,isLoggedIn, upload.single('listing[image]'), wrapAsync(async (req, res) => {
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  await newListing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
}));

// Edit Route
router.get("/:id/edit",isLoggedIn, wrapAsync(async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  
  res.render("listings/edit", { listing });
}));

// Update Route
router.put("/:id", validateListing,isLoggedIn, wrapAsync(async (req, res) => {
  await Listing.findByIdAndUpdate(req.params.id, { ...req.body.listing });
  req.flash("success", "Listing Updated Successfully!");
  res.redirect(`/listings/${req.params.id}`);
}));

// Delete Route
router.delete("/:id",isLoggedIn, wrapAsync(async (req, res) => {
  await Listing.findByIdAndDelete(req.params.id);
  req.flash("success", " Listing Deleted!");
  res.redirect("/listings");
}));

// GET reservation form page
router.get("/:id/reserve", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/reserve", { listing });
});

// POST reservation form
router.post("/:id/reserve", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const { name, email, checkin, checkout, guests } = req.body;

  // Optional: Save reservation info to DB
  // await Reservation.create({ listing: id, user: req.user._id, name, email, checkin, checkout, guests });

  // Set flash message for successful reservation
  req.flash(
    "success",
    ` Congratulations ${req.user.username || req.user.name}! Pack your bags for a wonderful stay! `
  );

  // Redirect to listings page after form submission
  res.redirect("/listings");
});


module.exports = router;


