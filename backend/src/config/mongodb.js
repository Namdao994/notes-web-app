import 'dotenv/config';

import {MongoClient, ServerApiVersion} from 'mongodb';
import {env} from './environment.js';

let notesWebAppInstance = null;

const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const connectDB = async () => {
  await mongoClientInstance.connect();

  notesWebAppInstance = mongoClientInstance.db(env.DATABASE_NAME);
};

export const closeDB = async () => {
  await mongoClientInstance.close();
};

export const getDB = () => {
  if (!notesWebAppInstance) throw new Error('Must connect to Database first');
  return notesWebAppInstance;
};
