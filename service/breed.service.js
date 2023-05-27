const mongoose = require("mongoose");

const { BreedModel, BREED_STATUS } = require("../models/breed.model");
// const { CategoryModel, CATEGORY_TYPE } = require("../models/category.model");

const viewBreed = async ({breedId}) => {
  if (!breedId) throw new Error("breedId is required");

     const selectedBreed =await BreedModel.findOne({_id:new mongoose.Types.ObjectId(breedId),status:BREED_STATUS.ACTIVE});
     if(!selectedBreed) throw new Error ("breed could not find")
     return selectedBreed;
     
};

const viewAllBreedByCategory = async ({categoryId}) => {
  if (!categoryId) throw new Error("categoryId is required");

  const viewAllBreeds = await BreedModel.find({
    categoryId: new mongoose.Types.ObjectId(categoryId),
    status: BREED_STATUS.ACTIVE,
  });

  if (!viewAllBreeds) throw new Error("category could not find");

  return viewAllBreeds;
};

module.exports = { viewBreed, viewAllBreedByCategory };
