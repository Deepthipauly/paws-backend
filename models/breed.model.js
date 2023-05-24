const mongoose= require ("mongoose")
const {Schema} = mongoose;


const imageSchema = new Schema({
    type: String,
    required: true,
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
      image: {
        type: String,
        required: true,
      },
      breedImage: [imageSchema],


});

module.exports = {
    BreedModel: mongoose.model("breed", breedSchema)
  };

