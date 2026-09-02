import mongoose from 'mongoose';

const farmerProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  fatherName: { type: String },
  address: { type: String },
  village: { type: String },
  district: { type: String },
  state: { type: String },
  pincode: { type: String },
  landDetails: [{
    khasraNo: String,
    areaInHectares: Number,
    ownershipType: String
  }],
  bankDetailsMasked: {
    accountNumber: String, // Masked string like XXXXXXX1234
    bankName: String,
    ifsc: String
  },
  languagePreference: { type: String, default: 'en' }
}, { timestamps: true });

const FarmerProfile = mongoose.model('FarmerProfile', farmerProfileSchema);
export default FarmerProfile;
