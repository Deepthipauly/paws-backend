const mongoose = require("mongoose");
const { ReviewModel, REVIEW_STATUS } = require("../models/review.model");

const viewAllReviews = async ({breedId}) => {
  if (!breedId) throw new Error("breedId is required");

  const viewBreedReviews = await ReviewModel.find({
    _id: new mongoose.Types.ObjectId(breedId),
    status: REVIEW_STATUS.ACTIVE,
  });

  return viewBreedReviews;
};

const addNewBreedReview = async ({ userId, breedId, name, reviews }) => {
  if (!userId) throw new Error("userId is required");
  const newBreedReview = await ReviewModel.create({
    name,
    reviews,
    breedId: new mongoose.Types.ObjectId(breedId),
    user: new mongoose.Types.ObjectId(userId),
  });
  console.log("added breed review", newBreedReview);
  return newBreedReview;
};

module.exports = { viewAllReviews, addNewBreedReview };

