import {StatusCodes} from 'http-status-codes';
import {noteService} from '../services/noteService.js';

const getNotesByUserId = async (req, res, next) => {
  try {
    const notes = await noteService.getNotesByUserId(req.jwtDecoded.userId);
    res.status(StatusCodes.OK).json(notes);
  } catch (error) {
    next(error);
  }
};

const createNewNote = async (req, res, next) => {
  try {
    const {title, content, tags} = req.body;
    const {userId} = req.jwtDecoded;
    const createdNote = await noteService.createNewNote({title, content, tags, userId});
    res.status(StatusCodes.OK).json({createdNote});
  } catch (error) {
    next(error);
  }
};

const updateNotePartial = async (req, res, next) => {
  try {
    const updatesField = req.body;
    const {userId} = req.jwtDecoded;
    const {id} = req.params;
    const updatedNote = await noteService.updateNotePartial(updatesField, userId, id);
    res.status(StatusCodes.OK).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

const deleteNoteById = async (req, res, next) => {
  try {
    const {userId} = req.jwtDecoded;
    const {id} = req.params;
    await noteService.deleteNoteById(id, userId);
    res.status(StatusCodes.OK).json({message: 'Deleted successfully'});
  } catch (error) {
    next(error);
  }
};

export const noteController = {
  getNotesByUserId,
  createNewNote,
  updateNotePartial,
  deleteNoteById,
};
