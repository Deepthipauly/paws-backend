const mongoose = require("mongoose");

const { Schema } = mongoose;


const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  categoryType: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },
  categoryImages: [],
},
{
  timestamps: true,
}
);

module.exports = {
  CategoryModel: mongoose.model("category", categorySchema)
};
