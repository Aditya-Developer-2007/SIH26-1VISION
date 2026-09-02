import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
  actorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Can be null for system actions
  actorRole: { type: String },
  action: { type: String, required: true },
  entityType: { type: String, required: true },
  entityId: { type: mongoose.Schema.Types.ObjectId, required: true },
  centreId: { type: mongoose.Schema.Types.ObjectId, ref: 'Centre' }, // To help filter logs by centre
  metadata: { type: mongoose.Schema.Types.Mixed } // Additional details
}, { timestamps: true });

const AuditLog = mongoose.model('AuditLog', auditLogSchema);
export default AuditLog;
