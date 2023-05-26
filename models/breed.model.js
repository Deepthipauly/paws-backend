const mongoose = require("mongoose");
const { Schema } = mongoose;
require("../models/category.model")


const BREED_STATUS = {
  ACTIVE: "ACTIVE",
  DELETED: "DELETED",
};

const breedImageSchema = new Schema({
  type: String,
});

const breedSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
  
  breedImages: [breedImageSchema],

  status: {
    type: String,
    default: BREED_STATUS.ACTIVE,
    enum: Object.values(BREED_STATUS)
  },

});

module.exports = {
  BreedModel: mongoose.model("breed", breedSchema),BREED_STATUS
};
