import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

process.env.PORT = 5005;
process.env.JWT_SECRET = 'agrocure_sih_2026_super_secret_jwt_key_1vison';

const mongoServer = await MongoMemoryServer.create();
process.env.MONGODB_URI = mongoServer.getUri();

const { default: app } = await import('./src/server.js');
const { seedDatabase } = await import('./src/seed.js');

import User from './src/models/User.js';
import Procurement from './src/models/Procurement.js';
import Payment from './src/models/Payment.js';
import Document from './src/models/Document.js';
import Centre from './src/models/Centre.js';

async function runTests() {
  await seedDatabase();
  console.log('\n--- Running Security Matrix Tests ---\n');

  const farmerA = await User.findOne({ role: 'FARMER' }).sort({ _id: 1 });
  const farmerB = await User.findOne({ role: 'FARMER' }).sort({ _id: -1 });
  
  const officerA = await User.findOne({ role: 'OFFICER' }).sort({ _id: 1 });
  const officerB = await User.findOne({ role: 'OFFICER' }).sort({ _id: -1 });
  
  const admin = await User.findOne({ role: 'ADMIN' });

  const getToken = (user) => jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

  const tokenFarmerA = getToken(farmerA);
  const tokenFarmerB = getToken(farmerB);
  const tokenOfficerA = getToken(officerA);
  const tokenOfficerB = getToken(officerB);
  const tokenAdmin = getToken(admin);

  const procA = await Procurement.findOne({ farmerId: farmerA._id });
  const procB = await Procurement.findOne({ farmerId: farmerB._id });
  
  const payB = await Payment.findOne({ farmerId: farmerB._id });
  const docB = await Document.findOne({ farmerId: farmerB._id });

  const results = [];

  const makeReq = async (method, path, token, body = null) => {
    const opts = { method, headers: { 'Authorization': `Bearer ${token}` } };
    if (body) {
      opts.headers['Content-Type'] = 'application/json';
      opts.body = JSON.stringify(body);
    }
    const res = await fetch(`http://127.0.0.1:5005${path}`, opts);
    return res.status;
  };

  const assert = async (num, desc, method, path, token, expected, body = null) => {
    let actual = 0;
    try {
      actual = await makeReq(method, path, token, body);
    } catch (e) {
      actual = 'ERROR';
    }
    const passed = expected.includes(actual);
    results.push(`| ${num} | ${desc} | Expected: ${expected.join('/')} | Actual: ${actual} | ${passed ? '✅ PASS' : '❌ FAIL'} |`);
  };

  // 1
  await assert(1, 'Farmer A GET their own procurement', 'GET', `/api/farmer/procurements/${procA._id}`, tokenFarmerA, [200]);
  // 2
  await assert(2, 'Farmer A GET Farmer B\'s procurement', 'GET', `/api/farmer/procurements/${procB._id}`, tokenFarmerA, [403, 404]);
  // 3
  if (payB) await assert(3, 'Farmer A GET Farmer B\'s payment', 'GET', `/api/farmer/payments/${payB._id}`, tokenFarmerA, [403, 404]);
  else results.push('| 3 | (Skipped - no payB) | | | |');
  // 4
  if (docB) await assert(4, 'Farmer A GET Farmer B\'s document', 'GET', `/api/documents/download/${docB._id}`, tokenFarmerA, [403, 404]);
  else results.push('| 4 | (Skipped - no docB) | | | |');
  // 5
  await assert(5, 'Officer @ Centre A GET a procurement belonging to Centre A', 'GET', `/api/officer/procurements/${procA._id}`, tokenOfficerA, [200]);
  // 6
  // Ensure officer A does NOT have access to procB's centre
  const hasAccess = officerA.assignedCentreIds.some(id => id.toString() === procB.centreId.toString());
  if (hasAccess) {
      // Find a procurement officer A doesn't have access to
      const allProc = await Procurement.find();
      const pB = allProc.find(p => !officerA.assignedCentreIds.some(id => id.toString() === p.centreId.toString()));
      await assert(6, 'Officer @ Centre A GET a procurement belonging to Centre B', 'GET', `/api/officer/procurements/${pB._id}`, tokenOfficerA, [403, 404]);
  } else {
      await assert(6, 'Officer @ Centre A GET a procurement belonging to Centre B', 'GET', `/api/officer/procurements/${procB._id}`, tokenOfficerA, [403, 404]);
  }
  // 7
  await assert(7, 'Officer @ Centre A GET Centre B\'s payments (endpoint not exist for officer)', 'GET', `/api/officer/payments`, tokenOfficerA, [403, 404]);
  // 8
  await assert(8, 'Officer @ Centre A GET Centre B\'s farmer list (endpoint not exist)', 'GET', `/api/officer/farmers`, tokenOfficerA, [403, 404]);
  // 9
  // Mutation endpoint
  let pB = procB;
  if (officerA.assignedCentreIds.some(id => id.toString() === pB.centreId.toString())) {
      const allProc = await Procurement.find();
      pB = allProc.find(p => !officerA.assignedCentreIds.some(id => id.toString() === p.centreId.toString()));
  }
  await assert(9, 'Officer @ Centre A PATCH/complete a Centre B procurement', 'POST', `/api/officer/procurements/${pB._id}/quality`, tokenOfficerA, [403, 404], { result: 'ACCEPTED' });
  // 10
  await assert(10, 'Admin JWT GET/list across multiple centres', 'GET', `/api/admin/procurements`, tokenAdmin, [200]);
  // 11
  await assert(11, 'Farmer GET any /admin/* API', 'GET', `/api/admin/procurements`, tokenFarmerA, [403, 404]);
  // 12
  await assert(12, 'Farmer GET any /officer/* API', 'GET', `/api/officer/dashboard`, tokenFarmerA, [403, 404]);
  // 13
  await assert(13, 'Officer GET any /admin/* API', 'GET', `/api/admin/dashboard`, tokenOfficerA, [403, 404]);
  // 14
  await assert(14, 'No token GET protected route', 'GET', `/api/farmer/dashboard`, '', [401]);
  // 15 - Test frontend simulation via blocked API access which corresponds to component redirects
  await assert(15, 'Farmer direct to /admin/* or /officer/* (API test)', 'GET', `/api/admin/dashboard`, tokenFarmerA, [403, 404]);

  console.log('| # | Request | Expected | Actual | Status |');
  console.log('|---|---------|----------|--------|--------|');
  results.forEach(r => console.log(r));

  process.exit(0);
}

runTests();
