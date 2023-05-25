const mongoose = require("mongoose");
const { Schema } = mongoose;

const REVIEW_STATUS = {
    ACTIVE: "ACTIVE",
    DELETED: "DELETED",
  };


const reviewSchema= new Schema({

    name: {
        type: String,
        required: true,
      },
      reviews: {
        type: String,
        required: true,
      },
      breedId: {
        type: Schema.Types.ObjectId,
        ref: "breed",
        required: true,
      },
      
      status: {
        type: String,
        default: REVIEW_STATUS.ACTIVE,
        enum: Object.values(REVIEW_STATUS)
      }


});

module.exports = {
    ReviewModel: mongoose.model("review", reviewSchema),REVIEW_STATUS
  };