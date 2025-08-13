import Joi from 'joi';
import {getDB} from '../config/mongodb.js';
import ApiError from '../utils/apiError.js';
import {StatusCodes} from 'http-status-codes';
import {toObjectId} from '../utils/formatters.js';
const USER_COLLECTION_NAME = 'users';
const USER_COllECTION_SCHEMA = Joi.object({
  name: Joi.string().required().min(3).max(50).trim().strict(),
  email: Joi.string().required().min(3).max(255).trim().strict(),
  password: Joi.string().required().min(3).max(255).trim().strict(),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false),
});

const createNewUser = async (data) => {
  try {
    const validData = await USER_COllECTION_SCHEMA.validateAsync(data, {
      abortEarly: false,
    });
    const createdUser = await getDB().collection(USER_COLLECTION_NAME).insertOne(validData);
    return createdUser;
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_REQUEST, error);
  }
};

const findUserByEmail = async (email) => {
  const user = await getDB().collection(USER_COLLECTION_NAME).findOne({
    email,
  });
  return user;
};

const getUserById = async (userId) => {
  const user = await getDB()
    .collection(USER_COLLECTION_NAME)
    .findOne(
      {
        _id: toObjectId(userId),
      },
      {
        projection: {
          password: 0,
          _destroy: 0,
        },
      }
    );
  return user;
};

export const userModel = {
  createNewUser,
  findUserByEmail,
  getUserById,
};
