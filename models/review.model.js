const mongoose = require("mongoose");
const { Schema } = mongoose;
require("./user.model");
require("./breed.model");

const REVIEW_STATUS = {
    ACTIVE: "ACTIVE",
    DELETED: "DELETED",
  };


const reviewSchema= new Schema({

      reviews: {
        type: String,
        required: true,
      },
      breedId: {
        type: Schema.Types.ObjectId,
        ref: "breed",
        required: true,
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      status: {
        type: String,
        default: REVIEW_STATUS.ACTIVE,
        enum: Object.values(REVIEW_STATUS)
      }
},
{
  timestamps: true,
}


);

module.exports = {
    ReviewModel: mongoose.model("review", reviewSchema),REVIEW_STATUS
  };