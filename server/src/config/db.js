import mongoose from 'mongoose';
import User from '../models/User.js';

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/agrocure';
    console.log(`[AGROCURE DATABASE] Attempting to connect to: ${uri}`);
    
    const conn = await mongoose.connect(uri);
    console.log(`[AGROCURE DATABASE] MongoDB Connected: ${conn.connection.host}`);
    
  } catch (error) {
    console.error(`[AGROCURE DATABASE] Error connecting to MongoDB: ${error.message}`);
    console.error(`Please ensure MongoDB is running locally on port 27017 or use 'docker-compose up -d'`);
    process.exit(1);
  }
};

export default connectDB;
