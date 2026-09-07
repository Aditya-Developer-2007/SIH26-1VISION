import mongoose from 'mongoose';

const slotSchema = new mongoose.Schema({
  centreId: { type: mongoose.Schema.Types.ObjectId, ref: 'Centre', required: true },
  date: { type: String, required: true }, // Format: YYYY-MM-DD
  startTime: { type: String, required: true }, // Format: HH:MM
  endTime: { type: String, required: true }, // Format: HH:MM
  capacity: { type: Number, required: true },
  bookedCount: { type: Number, default: 0 },
  status: { type: String, enum: ['open', 'full', 'closed'], default: 'open' }
}, { timestamps: true });

// Ensure we can quickly find a slot by centre and date
slotSchema.index({ centreId: 1, date: 1, startTime: 1 }, { unique: true });

const Slot = mongoose.model('Slot', slotSchema);
export default Slot;
