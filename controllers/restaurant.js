import createError from "http-errors";
import { InternalServerError } from "../helpers/error.js";
import { SetError, Success } from "../helpers/handle-data.js";
import SuccessResponse from "../helpers/success-response.js";
import { Restaurant } from "../model/Restaurants.js";
import idMap from "../utils/id-map.js";
import { v4 as uuidv4 } from "uuid";

export const restaurantDetails = async (req, res, next) => {
  const result = await Restaurant.aggregate([
    {
      $lookup: {
        from: "cuisines",
        foreignField: "restaurantId",
        localField: "_id",
        as: "dishDetails",
      },
    },
    {
      $project: {
        name: 1,
        address: 1,
        phone: 1,
        pictures: 1,
        title: 1,
        subtitle: 1,
        availability: 1,

        dishDetails: {
          _id: 1,
          name: 1,
          description: 1,
          category: 1,
          picsOfDish: 1,
          ingredients: 1,
        },
      },
    },
  ]);
  const output = Success(result);
  return SuccessResponse(res, output);
};

export const create = async (req, res, next) => {
  try {
    const result = await Restaurant.create({
      _id: `${idMap.restaurant}-${uuidv4()}`,
      ...req.body,
    });
    const output = Success(result);
    return SuccessResponse(res, output);
  } catch (err) {
    return next(InternalServerError(err));
  }
};

export const deleteRestarunt = async (req, res, next) => {
  try {
    const result = await Restaurant.findByIdAndDelete(req.params.restaurantId);
    if (result) {
      const output = Success("Restaurant has been deleted");
      return SuccessResponse(res, output);
    }
    return next(createError.NotFound(result));
  } catch (err) {
    return next(InternalServerError(err));
  }
};
