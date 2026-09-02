import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  procurementId: { type: mongoose.Schema.Types.ObjectId, ref: 'Procurement', required: true },
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  centreId: { type: mongoose.Schema.Types.ObjectId, ref: 'Centre', required: true },
  quantity: { type: Number, required: true },
  rate: { type: Number, required: true }, // MSP rate
  estimatedAmount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['PENDING', 'INITIATED', 'CREDITED', 'FAILED'],
    default: 'PENDING'
  },
  referenceNumber: { type: String },
  initiatedAt: { type: Date },
  creditedAt: { type: Date }
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
