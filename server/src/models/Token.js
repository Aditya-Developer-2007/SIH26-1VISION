import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
  tokenNumber: { type: String, required: true, unique: true },
  procurementId: { type: mongoose.Schema.Types.ObjectId, ref: 'Procurement', required: true },
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  centreId: { type: mongoose.Schema.Types.ObjectId, ref: 'Centre', required: true },
  date: { type: Date, required: true },
  slotStart: { type: String, required: true },
  slotEnd: { type: String, required: true },
  status: { type: String, enum: ['ACTIVE', 'USED', 'CANCELLED'], default: 'ACTIVE' }
}, { timestamps: true });

const Token = mongoose.model('Token', tokenSchema);
export default Token;
