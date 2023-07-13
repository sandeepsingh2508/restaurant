import createError from "http-errors";
import { InternalServerError } from "../helpers/error.js";
import { Success } from "../helpers/handle-data.js";
import SuccessResponse from "../helpers/success-response.js";
import { Cuisines } from "../model/Cuisines.js";
import idMap from "../utils/id-map.js";
import { v4 as uuidv4 } from "uuid";

export const getDishByRestaurantId = async (req, res, next) => {
  try {
    const result = await Cuisines.findOne({
      restaurantId: req.params.restaurantId,
    });
    if (result) {
      const output = Success(result);
      return SuccessResponse(res, output);
    }
    return next(createError.NotFound());
  } catch (err) {
    return next(InternalServerError(err));
  }
};

export const getAllDish = async (req, res, next) => {
  try {
    const result = await Cuisines.find();
    const output = Success(result);
    return SuccessResponse(res, output);
  } catch (err) {
    return next(InternalServerError(err));
  }
};

export const create = async (req, res, next) => {
  try {
    const result = await Cuisines.create({
      _id: `${idMap.cuisines}-${uuidv4()}`,
      restaurantId: req.params.restaurantId,
      ...req.body,
    });
    const output = Success(result);
    return SuccessResponse(res, output);
  } catch (err) {
    return next(InternalServerError(err));
  }
};

export const update = async (req, res, next) => {
  const data = await Cuisines.findById(req.params.cuisinesId);
  if (!data) {
    return next(createError.NotFound());
  }
  try {
    await Cuisines.updateOne(
      { cuisinesId: req.params.cuisinesId },
      { ...req.body }
    );
    const result = await Cuisines.findOne({
      cuisinesId: req.params.cuisinesId,
    });
    if (result) {
      const output = Success(result);
      return SuccessResponse(res, output);
    }
  } catch (e) {
    return next(InternalServerError(e));
  }
};

export const deleteDish = async (req, res, next) => {
  try {
    const result = await Cuisines.findByIdAndDelete(req.params.cuisinesId);
    if (result) {
      const output = Success("Cuisines has been deleted");
      return SuccessResponse(res, output);
    }
    return next(createError.NotFound());
  } catch (err) {
    return next(InternalServerError(err));
  }
};
