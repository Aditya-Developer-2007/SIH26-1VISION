import mongoose from 'mongoose';

const grievanceSchema = new mongoose.Schema({
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  centreId: { type: mongoose.Schema.Types.ObjectId, ref: 'Centre' }, // Optional, might be system level
  category: { type: String, required: true },
  message: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['SUBMITTED', 'UNDER_REVIEW', 'RESOLVED', 'REJECTED'],
    default: 'SUBMITTED'
  },
  resolutionMessage: { type: String }
}, { timestamps: true });

const Grievance = mongoose.model('Grievance', grievanceSchema);
export default Grievance;
