import jwt from 'jsonwebtoken'
import {User} from '../model/User.js';
import { InternalServerError } from '../helpers/error.js';
import createError from 'http-errors';

export const isAuthenticationUser = async (req, res, next) => {

  const  token  = req.cookies['token'];
  if (!token) {
   return next(createError.Unauthorized('Unauthorized'))
  }
  try{
    const decodeData = jwt.verify(token, process.env.JWT_SECREAT);
  req.user = await User.findById(decodeData.id);
  next();
  }catch(err){
    return next(InternalServerError(err))
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(createError.NotFound(`Role:${req.user.role} is not allowed to access this resource`,403)
      );
    }
    next();
  };
};
