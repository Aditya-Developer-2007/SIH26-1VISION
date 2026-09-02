import mongoose from 'mongoose';

const cropSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  season: { type: String, required: true },
  mspRate: { type: Number, required: true },
  status: { type: String, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' }
}, { timestamps: true });

const Crop = mongoose.model('Crop', cropSchema);
export default Crop;
