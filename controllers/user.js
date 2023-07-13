import { sendToken } from "../utils/token.js";
import { User } from "../model/User.js";
import { InternalServerError } from "../helpers/error.js";
import createError from "http-errors";

//register user
export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({
      name,
      email,
      password,
    });
    sendToken(user, 201, res);
  } catch (err) {
    return next(InternalServerError(err));
  }
};

//login user
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  //checking if user has given email or password
  if (!email || !password) {
    return next(createError.NotFound("email and password is required"));
  }
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(createError.NotFound("Invalid email or password"));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return next(createError.NotFound("Invalid email or password"));
    }
    sendToken(user, 200, res);
  } catch (err) {
    return next(InternalServerError(err));
  }
};
