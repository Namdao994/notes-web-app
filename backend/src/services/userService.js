import {StatusCodes} from 'http-status-codes';
import {userModel} from '../models/userModel.js';
import ApiError from '../utils/apiError.js';
import {jwtProvider} from '../providers/jwtProvider.js';
import {env} from '../config/environment.js';
import {ObjectId} from 'mongodb';
const createNewUser = async (reqBody) => {
  const email = reqBody.email.trim().toLowerCase();
  const existingEmail = await userModel.findUserByEmail(email);
  if (existingEmail) throw new ApiError(StatusCodes.CONFLICT, 'Email already exists');
  const user = {
    ...reqBody,
    email,
    name: reqBody.name.trim(),
  };
  const createdUser = await userModel.createNewUser(user);
  return createdUser;
};

const login = async (reqBody) => {
  const email = reqBody.email.trim().toLowerCase();
  const user = await userModel.findUserByEmail(email);
  if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
  if (reqBody.password !== user.password) throw new ApiError(StatusCodes.UNAUTHORIZED, 'Incorrect password');

  const userPayload = {
    userId: user._id.toString(),
    email: user.email,
  };
  const accessToken = jwtProvider.generateToken(userPayload, env.ACCESS_TOKEN_SECRET_SIGNATURE, '1h');
  const refreshToken = jwtProvider.generateToken(userPayload, env.REFRESH_TOKEN_SECRET_SIGNATURE, '14 days');
  return {accessToken, refreshToken, userPayload};
};

const getUserById = async (id) => {
  const userId = ObjectId.createFromHexString(id);
  const user = await userModel.getUserById(userId);
  if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
  return user;
};

export const userService = {
  createNewUser,
  login,
  getUserById,
};
