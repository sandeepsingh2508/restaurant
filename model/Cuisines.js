import mongoose from "mongoose";

const cuisineSchema = mongoose.Schema({
    _id:String,
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["veg", "nonveg"],
      required: true,
    },
    picsOfDish: {
      type: [String],
      default: [],
    },
    ingredients: {
      type: [String],
      default: [],
    },
    restaurantId:{
      type:String
    }
  });
  export const Cuisines=mongoose.model('Cuisine', cuisineSchema)