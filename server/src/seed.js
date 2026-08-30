import { demoStore } from './utils/demoStore.js';

console.log("=== AGROCURE DATA SEEDING ===");
console.log(`Seeded Users: ${demoStore.users.length} (Farmer: Ramesh Kumar, Officer: Vikram Singh, Admin: Ananya Sharma)`);
console.log(`Seeded Procurement Records: ${demoStore.procurements.length} (Token: AGRO-2048, Mandi Bhawan, Wheat 18.5 Quintal)`);
console.log(`Seeded Payment Records: ${demoStore.payments.length} (₹44,862.50 via SBI XXXX 4812)`);
console.log(`Seeded Procurement Centres: ${demoStore.centres.length}`);
console.log("Seeding complete! Standalone demo store ready.");
