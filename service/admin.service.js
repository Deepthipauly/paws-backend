const mongoose = require("mongoose");
const { BreedModel, BREED_STATUS } = require("../models/breed.model");
const { UserModel, USER_STATUS } = require("../models/user.model");
const { ReviewModel,REVIEW_STATUS} =require("../models/review.model")

const addBreed = async (breedData) => {
  const { name, description, categoryId, breedImages } = breedData;
  if (!name) throw new Error("name is required");
  if (!description) throw new Error("description is required");
  if (!categoryId) throw new Error("category ID is required");
  if (!breedImages) throw new Error("breedImages are required");
  if (!Array.isArray(breedImages))
    throw new Error("breed image should be a list");

  const newBreed = await BreedModel.create({
    name,
    description,
    categoryId,
    breedImages,
  });

  console.log("NEW BREED ADDED", newBreed);
  return newBreed;
};

const editBreed = async (breedData) => {
  const { name, description, categoryId, breedId, breedImages } = breedData;
  if (!name) throw new Error("name is required");
  if (!description) throw new Error("description is required");
  if (!categoryId) throw new Error("category ID is required");
  if (!breedImages) throw new Error("breedImages are required");
  if (!Array.isArray(breedImages))
    throw new Error("breed image should be a list");
  if (!breedId) throw new Error("breedId is required");
  const isBreedActive = await BreedModel.countDocuments({
    _id: new mongoose.Types.ObjectId(breedId),
    status: BREED_STATUS.ACTIVE,
  });
  if (isBreedActive <= 0) throw new Error("Breed not find");
  const editedBreedData = await BreedModel.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(breedId) },
    {
      name,
      description,
      categoryId,
      breedId,
      breedImages,
    }
  );
  return editedBreedData;
};

const deleteBreed = async (breedId) => {
  if (!breedId) throw new Error("breed id is required");
  const deletedBreedData = await BreedModel.findByIdAndUpdate(
    breedId,
    { status: BREED_STATUS.DELETED },
    { new: true }
  );
  if (deletedBreedData.status !== BREED_STATUS.DELETED)
    throw new Error("breed is not deleted");
  return deletedBreedData;
};

const deletedUser = async (userId) => {
  if (!userId) throw new Error("userId is required");

  const deletedUserData = await UserModel.findByIdAndUpdate(
    userId,
    { status: USER_STATUS.DELETED },
    //update cheytha data return kitan only for findById findOneandUpdate
    { new: true }
  );

  if (deletedUserData.status !== USER_STATUS.DELETED)
    throw new Error("user is not deleted");
  return deletedUserData;
};



const deletedReviews = async (reviewId) => {

  if(!reviewId) throw new Error ("reviewId is required")


  const deletedReviewData = await ReviewModel.findByIdAndUpdate(
    reviewId,
    { status: REVIEW_STATUS.DELETED },
    { new: true }
  );

  if (deletedReviewData.status !== REVIEW_STATUS.DELETED)
    throw new Error("review is not deleted");
  return deletedReviewData;

};


module.exports ={addBreed,editBreed,deleteBreed,deletedUser,deletedReviews}

