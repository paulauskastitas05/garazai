'use server'

import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://admin:ADMIN@serverlessinstance0.mqpweuh.mongodb.net/?retryWrites=true&w=majority&appName=ServerlessInstance0';

async function connectToDB() {
  try {
    await mongoose.connect(MONGODB_URI, {
      appName: 'ServerlessInstance0' // Optional: if appName is required
    });
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToDB();

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

async function connectToDatabase(): Promise<Mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    // No longer need to pass useNewUrlParser or useUnifiedTopology
    cached.promise = mongoose.connect(MONGODB_URI, {});
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

global.mongoose = cached;

export default connectToDatabase;
