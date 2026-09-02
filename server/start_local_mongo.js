import { MongoMemoryServer } from 'mongodb-memory-server';
import fs from 'fs';

async function start() {
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

  console.log('Mock MongoDB daemon running at', mongoServer.getUri());
  // Keep process alive
  process.stdin.resume();
}

start();
