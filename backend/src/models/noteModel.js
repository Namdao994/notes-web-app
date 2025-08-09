import Joi from 'joi';
import {OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE} from '../utils/validators.js';
import {getDB} from '../config/mongodb.js';
import ApiError from '../utils/apiError.js';
import {StatusCodes} from 'http-status-codes';
import {ObjectId} from 'mongodb';
import {toObjectId} from '../utils/formatters.js';
const NOTE_COLLECTION_NAME = 'notes';
const NOTE_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().required().min(3).trim().strict(),
  content: Joi.string().required().min(3).trim().strict(),
  tags: Joi.array()
    .items(
      Joi.object({
        label: Joi.string().required().min(3).max(50).trim().strict(),
        color: Joi.string().required().min(3).max(50).trim().strict(),
      })
    )
    .default([]),
  isPinned: Joi.boolean().default(false),
  userId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  _destroy: Joi.boolean().default(false),
});

const createNewNote = async (note) => {
  try {
    const validData = await NOTE_COLLECTION_SCHEMA.validateAsync(note, {abortEarly: false});
    const ceratedNote = await getDB()
      .collection(NOTE_COLLECTION_NAME)
      .insertOne({
        ...validData,
        userId: ObjectId.createFromHexString(validData.userId),
      });
    return ceratedNote;
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_REQUEST, error);
  }
};

const getNotesByUserId = async (userId) => {
  try {
    const notes = await getDB()
      .collection(NOTE_COLLECTION_NAME)
      .find({userId: ObjectId.createFromHexString(userId)})
      .sort({createdAt: -1})
      .project({_destroy: 0})
      .toArray();
    return notes;
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_REQUEST, error);
  }
};

const findNoteById = async (noteId) => {
  try {
    const note = await getDB()
      .collection(NOTE_COLLECTION_NAME)
      .findOne(
        {
          _id: toObjectId(noteId),
        },
        {
          projection: {
            _destroy: 0,
          },
        }
      );
    return note;
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_REQUEST, error);
  }
};

const updateNotePartial = async (updatesField, userId, noteId) => {
  try {
    const result = await getDB()
      .collection(NOTE_COLLECTION_NAME)
      .updateOne(
        {_id: ObjectId.createFromHexString(noteId), userId: ObjectId.createFromHexString(userId)},
        {$set: updatesField}
      );
    return result;
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_REQUEST, error);
  }
};

const deleteNoteById = async (id, userId) => {
  try {
    const result = await getDB()
      .collection(NOTE_COLLECTION_NAME)
      .deleteOne({
        _id: toObjectId(id),
        userId: toObjectId(userId),
      });
    return result;
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_REQUEST, error);
  }
};

export const noteModel = {
  createNewNote,
  findNoteById,
  getNotesByUserId,
  updateNotePartial,
  deleteNoteById,
};
