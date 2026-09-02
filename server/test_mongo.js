import mongoose from 'mongoose';
const MONGODB_URI = 'mongodb+srv://aadityasaini2602_db_user:MtuY8rvIMtcN8aHt@cluster0.nbq7l8q.mongodb.net/agrocure?appName=Cluster0';

async function testConnection() {
  try {
    console.log('Connecting to Atlas...');
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
    console.log('Success!');
    process.exit(0);
  } catch (error) {
    console.error('Failed:', error.message);
    process.exit(1);
  }
}

testConnection();
