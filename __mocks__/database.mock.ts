import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

// create database in memory
const database = new MongoMemoryServer();

/**
 * connect to database
 */
export const connect = async (): Promise<void> => {
  const uri: string = await database.getUri();
  const mongooseOptions = {
    useNewUrlParse: true,
    useUnifiedTopology: true,
    poolSize: 10,
  };

  await mongoose.connect(uri, mongooseOptions);
};

/**
 * close database connection and drop database
 */
export const close = async (): Promise<void> => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await database.stop();
};

/**
 * clear all data on collections
 */
export const clear = async (): Promise<void> => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};
