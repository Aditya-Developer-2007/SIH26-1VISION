import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['SYSTEM', 'PROCUREMENT', 'PAYMENT', 'GRIEVANCE'],
    default: 'SYSTEM'
  },
  read: { type: Boolean, default: false },
  referenceId: { type: mongoose.Schema.Types.ObjectId } // Optional link to related entity
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
