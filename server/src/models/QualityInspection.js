import mongoose from 'mongoose';

const qualityInspectionSchema = new mongoose.Schema({
  procurementId: { type: mongoose.Schema.Types.ObjectId, ref: 'Procurement', required: true },
  officerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  expectedQuantity: { type: Number, required: true },
  actualWeight: { type: Number, required: true },
  moisture: { type: Number, required: true },
  grade: { type: String, required: true },
  remarks: { type: String },
  result: { type: String, enum: ['ACCEPTED', 'REJECTED'], required: true }
}, { timestamps: true });

const QualityInspection = mongoose.model('QualityInspection', qualityInspectionSchema);
export default QualityInspection;
