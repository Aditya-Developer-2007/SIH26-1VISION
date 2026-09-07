import mongoose from 'mongoose';

const procurementSchema = new mongoose.Schema({
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  centreId: { type: mongoose.Schema.Types.ObjectId, ref: 'Centre', required: true },
  cropId: { type: mongoose.Schema.Types.ObjectId, ref: 'Crop', required: true },
  quantity: { type: Number, required: true },
  season: { type: String, required: true },
  year: { type: Number, required: true },
  mspRate: { type: Number, required: true },
  status: { 
    type: String, 
    enum: [
      'REGISTERED', 
      'VERIFIED', 
      'TOKEN_GENERATED', 
      'SCHEDULED', 
      'QUALITY_CHECK', 
      'PROCURED', 
      'PAYMENT_INITIATED', 
      'PAYMENT_RECEIVED'
    ],
    default: 'REGISTERED'
  },
  tokenId: { type: mongoose.Schema.Types.ObjectId, ref: 'Token' },
  slotId: { type: mongoose.Schema.Types.ObjectId, ref: 'Slot' },
  scheduledDate: { type: Date },
  slotStart: { type: String },
  slotEnd: { type: String },
  estimatedAmount: { type: Number },
  statusHistory: [{
    status: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Admin/Officer who made the change
  }]
}, { timestamps: true });

const Procurement = mongoose.model('Procurement', procurementSchema);
export default Procurement;
