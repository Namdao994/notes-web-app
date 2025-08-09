import express from 'express';
import {env} from './config/environment.js';
import {connectDB} from './config/mongodb.js';
import {APIs_V1} from './routes/v1/index.js';
import cookieParser from 'cookie-parser';
import {errorHandlingMiddleware} from './middlewares/errorHandlingMiddleware.js';

const startServer = () => {
  const app = express();

  //Xử lí req.body
  app.use(express.json());
  //Xử lí cookie
  app.use(cookieParser());

  app.use('/v1', APIs_V1);

  app.use(errorHandlingMiddleware);

  if (env.BUILD_MODE === 'production') {
    //
  } else {
    // Môi trường dev
    app.listen(env.LOCAL_DEV_APP_PORT, env.LOCAL_DEV_APP_HOST, () => {
      console.log(`Local dev: Running at http://${env.LOCAL_DEV_APP_HOST}:${env.LOCAL_DEV_APP_PORT}`);
    });
  }
};

(async () => {
  try {
    console.log('connect db');
    await connectDB();
    console.log('connect success db');
    startServer();
  } catch (err) {
    console.log(err);
  }
})();
