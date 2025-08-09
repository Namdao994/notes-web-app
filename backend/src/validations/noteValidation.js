import Joi from 'joi';
import {OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE} from '../utils/validators.js';
import ApiError from '../utils/apiError.js';
import {StatusCodes} from 'http-status-codes';

const createNewNote = async (req, res, next) => {
  const correctNoteCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().message({
      'any.required': 'Title is required',
      'string.empty': 'Title is not allowed to be empty',
      'string.min': 'Title length must be at least 3 characters long',
      'string.max': 'Title length must be less than or equal to 50 characters long',
      'string.trim': 'Title must not have leading or trailing whitespace',
    }),
    content: Joi.string().required().min(3).trim().strict().message({
      'any.required': 'content is required',
      'string.empty': 'content is not allowed to be empty',
      'string.min': 'content length must be at least 3 characters long',
      'string.trim': 'content must not have leading or trailing whitespace',
    }),
    tags: Joi.array().items({
      label: Joi.string().required().min(3).max(50).trim().strict().message({
        'any.required': 'Label is required',
        'string.empty': 'Label is not allowed to be empty',
        'string.min': 'Label length must be at least 3 characters long',
        'string.max': 'Label length must be less than or equal to 50 characters long',
        'string.trim': 'Label must not have leading or trailing whitespace',
      }),
      color: Joi.string().required().min(3).max(50).trim().strict().message({
        'any.required': 'Color is required',
        'string.empty': 'Color is not allowed to be empty',
        'string.min': 'Color length must be at least 3 characters long',
        'string.max': 'Color length must be less than or equal to 50 characters long',
        'string.trim': 'Color must not have leading or trailing whitespace',
      }),
    }),
  });

  try {
    await correctNoteCondition.validateAsync(req.body, {abortEarly: false});
    next();
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message));
  }
};

const updateNote = async (req, res, next) => {
  const correctNoteCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().message({
      'any.required': 'Title is required',
      'string.empty': 'Title is not allowed to be empty',
      'string.min': 'Title length must be at least 3 characters long',
      'string.max': 'Title length must be less than or equal to 50 characters long',
      'string.trim': 'Title must not have leading or trailing whitespace',
    }),
    content: Joi.string().required().min(3).trim().strict().message({
      'any.required': 'content is required',
      'string.empty': 'content is not allowed to be empty',
      'string.min': 'content length must be at least 3 characters long',
      'string.trim': 'content must not have leading or trailing whitespace',
    }),
    tags: Joi.array().items({
      label: Joi.string().required().min(3).max(50).trim().strict().message({
        'any.required': 'Label is required',
        'string.empty': 'Label is not allowed to be empty',
        'string.min': 'Label length must be at least 3 characters long',
        'string.max': 'Label length must be less than or equal to 50 characters long',
        'string.trim': 'Label must not have leading or trailing whitespace',
      }),
      color: Joi.string().required().min(3).max(50).trim().strict().message({
        'any.required': 'Color is required',
        'string.empty': 'Color is not allowed to be empty',
        'string.min': 'Color length must be at least 3 characters long',
        'string.max': 'Color length must be less than or equal to 50 characters long',
        'string.trim': 'Color must not have leading or trailing whitespace',
      }),
    }),
    isPinned: Joi.boolean(),
  });

  try {
    await correctNoteCondition.validateAsync(req.body, {abortEarly: false});
    next();
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message));
  }
};

export const noteValidation = {
  createNewNote,
  updateNote,
};
