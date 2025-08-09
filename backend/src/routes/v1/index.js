import express from 'express';
import {StatusCodes} from 'http-status-codes';
import {userRoute} from './userRoute.js';
import {noteRoute} from './noteRoute.js';
import {adminRouter} from './adminRoute.js';
const Router = express.Router();

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({message: 'API V1 is ready to use'});
});

Router.use('/user', userRoute);

Router.use('/note', noteRoute);

Router.use('/admin', adminRouter);

export const APIs_V1 = Router;
