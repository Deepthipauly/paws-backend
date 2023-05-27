const mongoose = require("mongoose");
const { ReviewModel, REVIEW_STATUS } = require("../models/review.model");

const viewAllReviews = async ({breedId}) => {
  if (!breedId) throw new Error("breedId is required");

  const viewBreedReviews = await ReviewModel.find({
    breedId: new mongoose.Types.ObjectId(breedId),
    status: REVIEW_STATUS.ACTIVE,
  }).populate([
    { path: "breedId", select: "name description" },
    { path: "user", select: "username" },
  ]);



  return viewBreedReviews;
};

const addNewBreedReview = async ({ userId, breedId, reviews }) => {
  if (!userId) throw new Error("userId is required");
  const newBreedReview = await ReviewModel.create({
    reviews,
    breedId: new mongoose.Types.ObjectId(breedId),
    user: new mongoose.Types.ObjectId(userId),
  });
  console.log("added breed review", newBreedReview);
  return newBreedReview;
};

module.exports = { viewAllReviews, addNewBreedReview };

