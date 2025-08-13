import express from 'express';
import {userValidation} from '../../validations/userValidation.js';
import {userController} from '../../controllers/userController.js';
import {authMiddleware} from '../../middlewares/authMiddleware.js';

const Router = express.Router();

Router.post('/login', userController.login);

Router.post('/signup', userValidation.createNewUser, userController.createNewUser);

Router.delete('/logout', authMiddleware.isAuthorized, userController.logout);

Router.route('/:id').get(authMiddleware.isAuthorized, userController.getUserById);

export const userRoute = Router;
