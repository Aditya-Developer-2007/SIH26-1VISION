import mongoose from 'mongoose';

const centreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  address: { type: String },
  district: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String },
  latitude: { type: Number },
  longitude: { type: Number },
  capacity: { type: Number, required: true }, // Max slots per day
  status: { type: String, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' }
}, { timestamps: true });

const Centre = mongoose.model('Centre', centreSchema);
export default Centre;
