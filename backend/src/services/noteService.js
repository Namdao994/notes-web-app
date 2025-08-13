import {StatusCodes} from 'http-status-codes';
import {noteModel} from '../models/noteModel.js';
import ApiError from '../utils/apiError.js';

const createNewNote = async (data) => {
  const createdNote = await noteModel.createNewNote(data);
  const getNewBoard = await noteModel.findNoteById(createdNote.insertedId);
  return getNewBoard;
};

const getNotesByUserId = async (userId) => {
  const notes = await noteModel.getNotesByUserId(userId);
  const modifiedNotes = notes.map(({_id, ...rest}) => ({
    id: _id,
    ...rest,
  }));
  return modifiedNotes;
};

const updateNotePartial = async (updatesField, userId, noteId) => {
  const result = await noteModel.updateNotePartial(updatesField, userId, noteId);
  if (result.matchedCount === 0) throw new ApiError(StatusCodes.NOT_FOUND, 'Note not found');
  const modifiedNote = await noteModel.findNoteById(noteId);
  return modifiedNote;
};

const deleteNoteById = async (id, userId) => {
  const result = await noteModel.deleteNoteById(id, userId);
  if (result.deletedCount === 0) throw new ApiError(StatusCodes.NOT_FOUND, 'Note not found');
  return result;
};

export const noteService = {
  createNewNote,
  getNotesByUserId,
  updateNotePartial,
  deleteNoteById,
};
