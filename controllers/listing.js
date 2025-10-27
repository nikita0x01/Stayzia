const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
  let allListings = await Listing.find({});
  res.render("listings/index", { listings: allListings });
};

module.exports.renderNewForm = (req , res ) => (req, res) => {
  res.render("listings/new"); // ✅ render the correct EJS template
};

module.exports.showListing = async (req, res) => {
  const listing = await Listing.findById(req.params.id).populate({ path: "reviews" , populate:{path:"author"},}).populate("owner");
  if(!listing) {
    req.flash("error" , "Listing You requested for does not exist");
    res.redirect("/listings");
  }
  console.log(listing);
  res.render("listings/show", { listing });

};


module.exports.createListing = async (req, res) => {
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  await newListing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};
module.exports.editListing= async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  
  res.render("listings/edit", { listing });
};

module.exports.updateListing = async (req, res) => {
  await Listing.findByIdAndUpdate(req.params.id, { ...req.body.listing });
  req.flash("success", "Listing Updated Successfully!");
  res.redirect(`/listings/${req.params.id}`);
};

module.exports.deleteListing = async (req, res) => {
  await Listing.findByIdAndDelete(req.params.id);
  req.flash("success", " Listing Deleted!");
  res.redirect("/listings");
};