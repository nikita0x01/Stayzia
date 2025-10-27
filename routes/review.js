const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");
const reviews = require("../controllers/review");

// POST /listings/:id/reviews
router.post("/", isLoggedIn, validateReview, wrapAsync(reviews.createReview));

// DELETE /listings/:id/reviews/:reviewId
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviews.deleteReview));

module.exports = router;
