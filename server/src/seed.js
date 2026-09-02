import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import connectDB from './config/db.js';
import User from './models/User.js';
import FarmerProfile from './models/FarmerProfile.js';
import Centre from './models/Centre.js';
import Crop from './models/Crop.js';
import Procurement from './models/Procurement.js';
import Payment from './models/Payment.js';
import Token from './models/Token.js';
import QualityInspection from './models/QualityInspection.js';
import Document from './models/Document.js';
import Notification from './models/Notification.js';
import Grievance from './models/Grievance.js';
import AuditLog from './models/AuditLog.js';

dotenv.config();
// connectDB(); // Removed to allow running from server.js

export const seedDatabase = async () => {
  try {
    // 1. Clear Existing
    console.log('Clearing existing data...');
    await Promise.all([
      User.deleteMany(), FarmerProfile.deleteMany(), Centre.deleteMany(), Crop.deleteMany(),
      Procurement.deleteMany(), Payment.deleteMany(), Token.deleteMany(), QualityInspection.deleteMany(),
      Document.deleteMany(), Notification.deleteMany(), Grievance.deleteMany(), AuditLog.deleteMany()
    ]);

    // Password for all demo accounts
    const passwordHash = 'password123'; // Note: User pre-save hook handles hashing

    // 2. Create Crops
    console.log('Seeding crops...');
    const crops = await Crop.insertMany([
      { name: 'Wheat', season: 'Rabi', mspRate: 2425 },
      { name: 'Paddy', season: 'Kharif', mspRate: 2320 },
      { name: 'Mustard', season: 'Rabi', mspRate: 5650 }
    ]);

    // 3. Create Centres
    console.log('Seeding centres...');
    const centres = await Centre.insertMany([
      { name: 'Mandi Bhawan', code: 'MB-KNL-01', district: 'Karnal', state: 'Haryana', capacity: 100 },
      { name: 'District Grain Market', code: 'DGM-AMB-02', district: 'Ambala', state: 'Haryana', capacity: 150 },
      { name: 'Krishi Procurement Centre', code: 'KPC-PNP-03', district: 'Panipat', state: 'Haryana', capacity: 80 },
      { name: 'Govt Mandi Kurukshetra', code: 'GMK-KRK-04', district: 'Kurukshetra', state: 'Haryana', capacity: 120 },
      { name: 'Rohtak Main Mandi', code: 'RMM-RTK-05', district: 'Rohtak', state: 'Haryana', capacity: 200 }
    ]);

    // 4. Create Users (Admin, Officers)
    console.log('Seeding admin and officers...');
    const adminUser = new User({ name: 'System Admin', mobile: '1111111111', email: 'admin@agrocure.demo', passwordHash, role: 'ADMIN' });
    
    const officersData = [
      { name: 'Rajesh Singh', mobile: '2222222222', email: 'rajesh@agrocure.demo', assignedCentreIds: [centres[0]._id] },
      { name: 'Amit Kumar', mobile: '2222222223', email: 'amit@agrocure.demo', assignedCentreIds: [centres[1]._id] },
      { name: 'Sunita Verma', mobile: '2222222224', email: 'sunita@agrocure.demo', assignedCentreIds: [centres[2]._id] },
      { name: 'Vikas Sharma', mobile: '2222222225', email: 'vikas@agrocure.demo', assignedCentreIds: [centres[3]._id] }
    ];
    
    const officers = await Promise.all(officersData.map(o => new User({ ...o, passwordHash, role: 'OFFICER' }).save()));
    await adminUser.save();

    // 5. Create Farmers
    console.log('Seeding farmers...');
    const farmerNames = [
      'Ramesh Kumar', 'Suresh Yadav', 'Sunita Devi', 'Mahesh Patel', 'Pooja Kumari', 'Ram Singh', 
      'Raju Sharma', 'Mohan Lal', 'Hari Om', 'Sandeep Nain', 'Vikram Dalal', 'Rajvir Punia',
      'Kamal Kishore', 'Manoj Deswal', 'Balwan Singh', 'Dharmender Kadian', 'Pawan Rathi', 'Jaideep Ahlawat',
      'Anand Sangwan', 'Rakesh Malik', 'Kuldeep Boora', 'Jagdish Duhan', 'Naresh Lohan', 'Ashok Chahal'
    ];
    
    const farmers = [];
    for (let i = 0; i < farmerNames.length; i++) {
      const mobile = `98765432${String(i).padStart(2, '0')}`;
      const f = new User({ name: farmerNames[i], mobile, passwordHash, role: 'FARMER' });
      await f.save();
      farmers.push(f);
      
      await new FarmerProfile({
        userId: f._id,
        fatherName: 'Father of ' + farmerNames[i],
        village: 'Demo Village ' + (i%5),
        district: centres[i % centres.length].district,
        state: 'Haryana',
        landDetails: [{ khasraNo: `K-${100+i}`, areaInHectares: (Math.random() * 5 + 1).toFixed(2), ownershipType: 'OWNER' }],
        bankDetailsMasked: { accountNumber: `XXXXXXX${1000+i}`, bankName: 'SBI', ifsc: 'SBIN0001234' }
      }).save();
    }

    // Main Demo Farmer explicitly guaranteed to match user prompt logic (9876543210)
    let demoFarmer = farmers.find(f => f.mobile === '9876543210');
    if (!demoFarmer) {
        demoFarmer = new User({ name: 'Ramesh Kumar (Demo)', mobile: '9876543210', passwordHash, role: 'FARMER' });
        await demoFarmer.save();
        await new FarmerProfile({
            userId: demoFarmer._id, fatherName: 'Demo Father', village: 'Nigdhu', district: 'Karnal', state: 'Haryana',
            landDetails: [{ khasraNo: 'K-999', areaInHectares: 2.5, ownershipType: 'OWNER' }],
            bankDetailsMasked: { accountNumber: 'XXXXXXX1234', bankName: 'HDFC', ifsc: 'HDFC0001234' }
        }).save();
    }

    // 6. Create Procurements & Cross-Role Lifecycle Data (MOVED TO seed-demo-activity.js)

    console.log('Seed completed successfully!');
    // process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    // process.exit(1);
  }
};

// If run directly, connect and execute
if (process.argv[1] && process.argv[1].endsWith('seed.js')) {
  connectDB().then(() => {
    seedDatabase().then(() => process.exit(0)).catch(() => process.exit(1));
  });
}
