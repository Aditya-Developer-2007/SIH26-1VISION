import Procurement from '../models/Procurement.js';
import Notification from '../models/Notification.js';
import Payment from '../models/Payment.js';
import Document from '../models/Document.js';
import FarmerProfile from '../models/FarmerProfile.js';
import Centre from '../models/Centre.js';
import Crop from '../models/Crop.js';
import Token from '../models/Token.js';
import Grievance from '../models/Grievance.js';

export const getFarmerDashboard = async (req, res) => {
  try {
    const procurements = await Procurement.find({ farmerId: req.user._id }).populate('centreId').populate('cropId').populate('tokenId');
    const payments = await Payment.find({ farmerId: req.user._id });
    const notifications = await Notification.find({ userId: req.user._id, read: false }).sort({ createdAt: -1 });
    
    let activeProcurementRaw = procurements.find(p => ['SCHEDULED', 'QUALITY_CHECK', 'PROCURED', 'PAYMENT_INITIATED', 'PAYMENT_RECEIVED'].includes(p.status));
    
    let activeProcurement = null;
    let todayAction = null;
    let token = null;
    let journeySteps = [];

    if (activeProcurementRaw) {
      activeProcurement = {
        cropName: activeProcurementRaw.cropId?.name,
        estimatedQuantityQuintals: activeProcurementRaw.quantity,
        status: activeProcurementRaw.status,
        tokenId: activeProcurementRaw.tokenId?.tokenNumber,
        centreName: activeProcurementRaw.centreId?.name,
        mspPerQuintal: activeProcurementRaw.mspRate,
        totalAmount: activeProcurementRaw.estimatedAmount
      };

      if (activeProcurementRaw.status === 'SCHEDULED') {
        todayAction = {
          title: "Gate Entry Scheduled",
          timeSlot: `${activeProcurementRaw.slotStart} - ${activeProcurementRaw.slotEnd}`,
          centreName: activeProcurementRaw.centreId?.name,
          distanceKm: 2,
          tokenNumber: activeProcurementRaw.tokenId?.tokenNumber,
          checklist: ['Meri Fasal Mera Byora', 'Aadhar Card', 'Bank Passbook']
        };
      }

      if (activeProcurementRaw.tokenId) {
        token = {
          tokenNumber: activeProcurementRaw.tokenId.tokenNumber,
          status: activeProcurementRaw.tokenId.status,
          farmerName: req.user.name,
          cropName: activeProcurementRaw.cropId?.name,
          quantityQuintals: activeProcurementRaw.quantity,
          centreName: activeProcurementRaw.centreId?.name,
          centreAddress: activeProcurementRaw.centreId?.district,
          slotDate: new Date(activeProcurementRaw.scheduledDate).toLocaleDateString(),
          slotTime: `${activeProcurementRaw.slotStart} - ${activeProcurementRaw.slotEnd}`,
          requiredDocs: ['Meri Fasal Mera Byora', 'Aadhar Card', 'Bank Passbook'],
          qrCodeData: activeProcurementRaw.tokenId.tokenNumber
        };
      }

      const statuses = ['REGISTERED', 'TOKEN_GENERATED', 'SCHEDULED', 'QUALITY_CHECK', 'PROCURED', 'PAYMENT_RECEIVED'];
      const currentIndex = statuses.indexOf(activeProcurementRaw.status);
      
      journeySteps = statuses.map((status, index) => ({
        title: status.replace(/_/g, ' '),
        description: `Status: ${status}`,
        timestamp: index <= currentIndex ? new Date().toISOString() : null,
        completed: index < currentIndex,
        current: index === currentIndex
      }));
    }

    let paymentData = null;
    if (payments.length > 0) {
      const p = payments[0];
      
      let pProcurement = null;
      if (activeProcurementRaw && p.procurementId.toString() === activeProcurementRaw._id.toString()) {
         pProcurement = activeProcurementRaw;
      } else {
         pProcurement = await Procurement.findById(p.procurementId).populate('cropId');
      }

      paymentData = {
        totalAmount: p.estimatedAmount,
        status: p.status,
        cropName: pProcurement?.cropId?.name,
        quantityQuintals: p.quantity,
        mspPerQuintal: p.rate,
        maskedAccount: "XXXXX1234",
        utrReference: p.referenceNumber || "PENDING-DBT",
        initiatedAt: p.initiatedAt ? new Date(p.initiatedAt).toLocaleDateString() : "Pending",
        timeline: [
          { label: 'J-Form Issued', done: true, date: p.createdAt.toLocaleDateString() },
          { label: 'DBT Payment Initiated', active: p.status === 'PENDING' || p.status === 'INITIATED', done: p.status === 'INITIATED' || p.status === 'CREDITED', date: p.initiatedAt ? new Date(p.initiatedAt).toLocaleDateString() : 'Processing' },
          { label: 'Bank Credit Received', active: false, done: p.status === 'CREDITED', date: p.creditedAt ? new Date(p.creditedAt).toLocaleDateString() : 'Pending' }
        ]
      };
    }

    res.json({
      success: true,
      data: {
        farmer: { name: req.user.name },
        todayAction,
        activeProcurement,
        token,
        payment: paymentData,
        journeySteps,
        nearbyCentres: await Centre.find({ status: 'ACTIVE' }).limit(3),
        smartInsight: { title: "Queue Update", message: "Normal wait times today.", type: "info" },
        procurements,
        notifications
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getFarmerProcurements = async (req, res) => {
  try {
    const procurements = await Procurement.find({ farmerId: req.user._id }).populate('centreId').populate('cropId').sort({ createdAt: -1 });
    res.json({ success: true, data: procurements });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getFarmerProcurementById = async (req, res) => {
  try {
    const p = await Procurement.findOne({ _id: req.params.id, farmerId: req.user._id });
    if (!p) return res.status(404).json({ success: false, message: 'Not found or not authorized' });
    res.json({ success: true, data: p });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getFarmerPaymentById = async (req, res) => {
  try {
    const p = await Payment.findOne({ _id: req.params.id, farmerId: req.user._id });
    if (!p) return res.status(404).json({ success: false, message: 'Not found or not authorized' });
    res.json({ success: true, data: p });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getFarmerProfile = async (req, res) => {
  try {
    const profile = await FarmerProfile.findOne({ userId: req.user._id }).populate('userId', 'name mobile email');
    res.json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateFarmerProfile = async (req, res) => {
  try {
    const updated = await FarmerProfile.findOneAndUpdate({ userId: req.user._id }, req.body, { new: true });
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getCrops = async (req, res) => {
  try {
    const crops = await Crop.find({ status: 'ACTIVE' });
    res.json({ success: true, data: crops });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getCentres = async (req, res) => {
  try {
    const centres = await Centre.find({ status: 'ACTIVE' });
    res.json({ success: true, data: centres });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const registerCropAndBookSlot = async (req, res) => {
  try {
    const { cropId, centreId, quantity, scheduledDate, slotStart, slotEnd } = req.body;
    
    const crop = await Crop.findById(cropId);
    if (!crop) return res.status(404).json({ success: false, message: 'Crop not found' });
    
    // Create Procurement
    const procurement = new Procurement({
      farmerId: req.user._id, centreId, cropId, quantity, season: crop.season, year: new Date().getFullYear(),
      mspRate: crop.mspRate, status: 'SCHEDULED', scheduledDate, slotStart, slotEnd,
      estimatedAmount: quantity * crop.mspRate
    });
    await procurement.save();

    // Generate Token
    const token = new Token({
      tokenNumber: `AGRO-${Math.floor(1000 + Math.random() * 9000)}`,
      procurementId: procurement._id, farmerId: req.user._id, centreId,
      date: scheduledDate, slotStart, slotEnd
    });
    await token.save();
    
    procurement.tokenId = token._id;
    await procurement.save();

    await new Notification({ userId: req.user._id, title: 'Slot Booked', message: `Your slot is booked for ${scheduledDate} with Token ${token.tokenNumber}` }).save();

    res.json({ success: true, data: procurement });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getFarmerDocuments = async (req, res) => {
  try {
    const docs = await Document.find({ farmerId: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, data: docs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getFarmerGrievances = async (req, res) => {
  try {
    const grievances = await Grievance.find({ farmerId: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, data: grievances });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const createFarmerGrievance = async (req, res) => {
  try {
    const { category, message, centreId } = req.body;
    const grievance = new Grievance({ farmerId: req.user._id, category, message, centreId });
    await grievance.save();
    res.json({ success: true, data: grievance });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
