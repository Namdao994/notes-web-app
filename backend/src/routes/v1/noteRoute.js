import express from 'express';
import {authMiddleware} from '../../middlewares/authMiddleware.js';
import {noteController} from '../../controllers/noteController.js';
import {noteValidation} from '../../validations/noteValidation.js';

const Router = express.Router();

Router.route('/')
  .get(authMiddleware.isAuthorized, noteController.getNotesByUserId)
  .post(authMiddleware.isAuthorized, noteValidation.createNewNote, noteController.createNewNote);

Router.route('/:id')
  .patch(authMiddleware.isAuthorized, noteValidation.updateNote, noteController.updateNotePartial)
  .delete(authMiddleware.isAuthorized, noteController.deleteNoteById);

export const noteRoute = Router;
