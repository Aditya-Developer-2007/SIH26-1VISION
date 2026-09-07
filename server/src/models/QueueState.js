import mongoose from 'mongoose';

const queueStateSchema = new mongoose.Schema({
  centreId: { type: mongoose.Schema.Types.ObjectId, ref: 'Centre', required: true },
  date: { type: String, required: true }, // Format: YYYY-MM-DD
  currentTokenBeingServed: { type: Number, default: 0 },
}, { timestamps: true });

// Unique index per centre per day
queueStateSchema.index({ centreId: 1, date: 1 }, { unique: true });

const QueueState = mongoose.model('QueueState', queueStateSchema);
export default QueueState;
