import mongoose from 'mongoose';
import validator from 'validator';
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxLength: [30, "Name cannot exceed 30 charecter"],
    minLength: [4, "Name should have more than 4 charecter"],
  },
  email: {
    type: String,
    required: [true, "please enter your email"],
    unique: true,
    validate: [validator.isEmail, "please enter valid email"],
  },
  password: {
    type: String,
    required: [true, "please enter your password"],
    minLength: [8, "password should be greater than 8 charecter"],
    select: false,
  },
  
  role: {
    type: String,
    default:'admin'
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});
//JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECREAT, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
//compare password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  
export const User =mongoose.model("User", userSchema);
