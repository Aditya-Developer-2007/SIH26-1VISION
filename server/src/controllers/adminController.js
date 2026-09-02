import User from '../models/User.js';
import Centre from '../models/Centre.js';
import Procurement from '../models/Procurement.js';
import Payment from '../models/Payment.js';
import Grievance from '../models/Grievance.js';
import AuditLog from '../models/AuditLog.js';
import QualityInspection from '../models/QualityInspection.js';

export const getAdminDashboard = async (req, res) => {
  try {
    const totalFarmers = await User.countDocuments({ role: 'FARMER' });
    const activeCentres = await Centre.countDocuments({ status: 'ACTIVE' });
    const pendingGrievances = await Grievance.countDocuments({ status: { $in: ['SUBMITTED', 'UNDER_REVIEW'] } });
    
    const allProcurements = await Procurement.find().populate('cropId');
    let todayProcurementQuintals = 0;
    let totalPayoutAmount = 0;

    const cropBreakdownMap = {};

    allProcurements.forEach(p => {
      if (['PROCURED', 'PAYMENT_INITIATED', 'PAYMENT_RECEIVED'].includes(p.status)) {
        todayProcurementQuintals += p.quantity;
        totalPayoutAmount += p.estimatedAmount;
        
        const cropName = p.cropId?.name || 'Unknown';
        if (!cropBreakdownMap[cropName]) {
          cropBreakdownMap[cropName] = { name: cropName, totalQuintals: 0, totalPayout: 0 };
        }
        cropBreakdownMap[cropName].totalQuintals += p.quantity;
        cropBreakdownMap[cropName].totalPayout += p.estimatedAmount;
      }
    });

    const cropBreakdown = Object.values(cropBreakdownMap).map(c => ({
      ...c,
      pct: todayProcurementQuintals > 0 ? (c.totalQuintals / todayProcurementQuintals) * 100 : 0
    }));

    const centresData = await Centre.find({ status: 'ACTIVE' });
    
    res.json({
      success: true,
      data: {
        kpis: {
          totalRegisteredFarmers: totalFarmers,
          todayProcurementQuintals,
          totalPayoutAmount,
          activeCentresCount: activeCentres,
          pendingGrievancesCount: pendingGrievances
        },
        cropBreakdown,
        centres: centresData.map(c => ({
          id: c._id, name: c.name, address: `${c.district}, ${c.state}`, queueCount: Math.floor(Math.random() * 50), capacityPct: Math.floor(Math.random() * 100)
        }))
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getAdminProcurements = async (req, res) => {
  try {
    const procurements = await Procurement.find().populate('farmerId', 'name mobile').populate('centreId', 'name district state').populate('cropId');
    res.json({ success: true, data: procurements });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getFarmersList = async (req, res) => {
  try {
    const farmers = await User.find({ role: 'FARMER' }).select('-passwordHash');
    res.json({ success: true, data: farmers });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getOfficersList = async (req, res) => {
  try {
    const officers = await User.find({ role: 'OFFICER' }).select('-passwordHash').populate('assignedCentreIds', 'name');
    res.json({ success: true, data: officers });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateOfficerAssignment = async (req, res) => {
  try {
    const { officerId } = req.params;
    const { assignedCentreIds } = req.body;
    
    const officer = await User.findOneAndUpdate(
      { _id: officerId, role: 'OFFICER' }, 
      { assignedCentreIds }, 
      { new: true }
    ).select('-passwordHash').populate('assignedCentreIds', 'name');
    
    res.json({ success: true, data: officer });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getPaymentsList = async (req, res) => {
  try {
    const payments = await Payment.find().populate('farmerId', 'name mobile').populate('centreId', 'name');
    res.json({ success: true, data: payments });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const initiatePayment = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const payment = await Payment.findById(paymentId);
    if (!payment) return res.status(404).json({ success: false, message: 'Payment not found' });
    
    payment.status = 'INITIATED';
    payment.initiatedAt = new Date();
    await payment.save();

    const procurement = await Procurement.findById(payment.procurementId);
    if (procurement) {
       procurement.status = 'PAYMENT_INITIATED';
       await procurement.save();
    }
    
    res.json({ success: true, data: payment });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getAdminCentreOfficers = async (req, res) => {
  try {
    const { centreId } = req.params;
    const officers = await User.find({ role: 'OFFICER', assignedCentreIds: centreId }).select('name mobile email');
    
    const officerStats = await Promise.all(officers.map(async (officer) => {
      const inspections = await QualityInspection.find({ officerId: officer._id }).populate({
        path: 'procurementId',
        populate: { path: 'cropId' }
      });

      let farmersProcessed = new Set();
      let totalQuantity = 0;
      let totalPayout = 0;

      inspections.forEach(insp => {
        if (insp.result === 'ACCEPTED' && insp.procurementId) {
          farmersProcessed.add(insp.procurementId.farmerId.toString());
          totalQuantity += insp.actualWeight;
          totalPayout += insp.actualWeight * (insp.procurementId.cropId?.mspRate || 0);
        }
      });

      return {
        id: officer._id,
        name: officer.name,
        mobile: officer.mobile,
        farmersProcessed: farmersProcessed.size,
        totalQuantityProcured: totalQuantity,
        totalPayoutAmount: totalPayout
      };
    }));

    res.json({ success: true, data: officerStats });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getAdminOfficerDetails = async (req, res) => {
  try {
    const { officerId } = req.params;
    const officer = await User.findById(officerId).select('name mobile email assignedCentreIds').populate('assignedCentreIds', 'name district');
    
    if (!officer) return res.status(404).json({ success: false, message: 'Officer not found' });

    const inspections = await QualityInspection.find({ officerId }).populate({
      path: 'procurementId',
      populate: [
        { path: 'cropId', select: 'name mspRate' },
        { path: 'farmerId', select: 'name mobile' },
        { path: 'tokenId', select: 'tokenNumber' }
      ]
    }).sort({ createdAt: -1 });

    const procurements = inspections.filter(insp => insp.procurementId).map(insp => {
      const p = insp.procurementId;
      return {
        id: p._id,
        token: p.tokenId?.tokenNumber || 'N/A',
        farmerName: p.farmerId?.name || 'Unknown',
        cropName: p.cropId?.name || 'Unknown',
        quantity: insp.actualWeight,
        amount: insp.actualWeight * (p.cropId?.mspRate || 0),
        date: insp.createdAt,
        status: p.status
      };
    });

    res.json({ 
      success: true, 
      data: {
        officer: {
          id: officer._id,
          name: officer.name,
          mobile: officer.mobile,
          email: officer.email,
          centres: officer.assignedCentreIds.map(c => c.name).join(', ')
        },
        procurements
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
