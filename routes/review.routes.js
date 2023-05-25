const express = require("express");

const router = express.Router();

const reviewController = require("../controllers/review.controller");

// viewAllReviews

router
  .route("/view_all_reviews")
  .get(reviewController.viewAllReviewsController);

//addNewBreedReview

router
  .route("/add_new_reviews")
  .post(reviewController.addNewBreedReviewController);

module.exports = router;
