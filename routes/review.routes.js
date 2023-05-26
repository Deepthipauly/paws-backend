const express = require("express");

const router = express.Router();

const reviewController = require("../controllers/review.controller");
const { verifyToken } = require("../middleware/token");

// viewAllReviews

router
  .route("/view_all_reviews/:breedId")
  .get(reviewController.viewAllReviewsController);

//addNewBreedReview

router
  .route("/add_new_reviews")
  .post(verifyToken, reviewController.addNewBreedReviewController);

module.exports = router;
