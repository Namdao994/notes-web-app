import Joi from 'joi';
import ApiError from '../utils/apiError.js';
import {StatusCodes} from 'http-status-codes';
const createNewUser = async (req, res, next) => {
  const correctUserCondition = Joi.object({
    name: Joi.string().required().min(3).max(50).trim().strict().message({
      'any.required': 'Name is required',
      'string.empty': 'Name is not allowed to be empty',
      'string.min': 'Name length must be at least 3 characters long',
      'string.max': 'Name length must be less than or equal to 50 characters long',
      'string.trim': 'Name must not have leading or trailing whitespace',
    }),
    email: Joi.string().required().min(10).max(255).trim().strict().message({
      'any.required': 'Email is required',
      'string.empty': 'Email is not allowed to be empty',
      'string.min': 'Email length must be at least 3 characters long',
      'string.max': 'Email length must be less than or equal to 50 characters long',
      'string.trim': 'Email must not have leading or trailing whitespace',
    }),
    password: Joi.string().required().min(3).max(255).trim().strict().message({
      'any.required': 'Password is required',
      'string.empty': 'Password is not allowed to be empty',
      'string.min': 'Password length must be at least 3 characters long',
      'string.max': 'Password length must be less than or equal to 255 characters long',
      'string.trim': 'Password must not have leading or trailing whitespace',
    }),
  });
  try {
    await correctUserCondition.validateAsync(req.body, {abortEarly: false});
    next();
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message));
  }
};

export const userValidation = {
  createNewUser,
};
