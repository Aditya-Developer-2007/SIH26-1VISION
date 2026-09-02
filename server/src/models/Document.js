import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  procurementId: { type: mongoose.Schema.Types.ObjectId, ref: 'Procurement' },
  centreId: { type: mongoose.Schema.Types.ObjectId, ref: 'Centre' },
  type: { 
    type: String, 
    enum: ['J_FORM', 'I_FORM', 'TOKEN', 'RECEIPT', 'PAYMENT_RECEIPT', 'OTHER'],
    required: true
  },
  title: { type: String, required: true },
  fileUrl: { type: String }, // In a real app this would point to S3, for prototype it can be a mock URL or base64
  status: { type: String, enum: ['GENERATED', 'VERIFIED', 'ARCHIVED'], default: 'GENERATED' }
}, { timestamps: true });

const Document = mongoose.model('Document', documentSchema);
export default Document;
