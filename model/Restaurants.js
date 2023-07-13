import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  _id: String,
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  pictures: {
    type: [String],
    default: [],
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  availability: {
    type: String,
    required: true,
  },
},
{
  timestamps:true
}
);
 export const Restaurant = mongoose.model("Restaurant", restaurantSchema);

