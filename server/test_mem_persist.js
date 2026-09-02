import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import fs from 'fs';

async function run() {
  if (!fs.existsSync('./.mongo_data')) {
    fs.mkdirSync('./.mongo_data');
  }

  const mongoServer = await MongoMemoryServer.create({
    instance: {
      port: 27017,
      dbPath: './.mongo_data',
      storageEngine: 'wiredTiger'
    }
  });

  const uri = mongoServer.getUri();
  console.log('MongoDB running at', uri);
  
  await mongoose.connect(uri);
  
  const TestModel = mongoose.model('Test', new mongoose.Schema({ name: String }));
  
  const count = await TestModel.countDocuments();
  console.log('Existing docs:', count);
  
  await TestModel.create({ name: 'Test ' + Date.now() });
  
  console.log('Inserted doc.');
  
  // Keep it running for a second to flush
  setTimeout(() => process.exit(0), 1000);
}

run();
