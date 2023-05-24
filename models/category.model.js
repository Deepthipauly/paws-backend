const mongoose = require("mongoose");

const { Schema } = mongoose;

const CATEGORY_TYPE = {
  DOG: "DOG",
  CAT: "CAT",
  BIRDS: "BIRDS",
  FISH: "FISH",
  RABBIT: "RABBIT",
  FERRETS: "FERRETS",
  HAMSTERS: "HAMSTERS",
};

const breedImageSchema = new Schema({
  type: String,
  required: true,
});

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  categoryType: {
    type: String,
    required: true,
    enum: Object.values(CATEGORY_TYPE),
  },

  description: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },
  breedImages: [breedImageSchema],
});

module.exports = {
  CategoryModel: mongoose.model("category", categorySchema),
  CATEGORY_TYPE,
};
