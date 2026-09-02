import Procurement from '../models/Procurement.js';
import User from '../models/User.js';
import QualityInspection from '../models/QualityInspection.js';
import Payment from '../models/Payment.js';
import Notification from '../models/Notification.js';

export const getOfficerDashboard = async (req, res) => {
  try {
    const assignedCentres = req.user.assignedCentreIds;

    const procurements = await Procurement.find({ 
      centreId: { $in: assignedCentres } 
    }).populate('farmerId', 'name mobile').populate('cropId', 'name mspRate').populate('tokenId', 'tokenNumber');

    const scheduledToday = procurements.filter(p => p.status === 'SCHEDULED').length;
    const qualityPending = procurements.filter(p => p.status === 'QUALITY_CHECK').length;
    const completedToday = procurements.filter(p => ['PROCURED', 'PAYMENT_INITIATED', 'PAYMENT_RECEIVED'].includes(p.status)).length;
    
    let totalProcuredQuintals = 0;
    procurements.forEach(p => {
      if (['PROCURED', 'PAYMENT_INITIATED', 'PAYMENT_RECEIVED'].includes(p.status)) {
        totalProcuredQuintals += p.quantity;
      }
    });

    const arrivals = procurements.map(p => ({
      id: p._id,
      tokenId: p.tokenId?.tokenNumber || 'PENDING',
      farmerName: p.farmerId?.name || 'Unknown',
      farmerPhone: p.farmerId?.mobile || '',
      cropName: p.cropId?.name || 'Unknown',
      estimatedQuantityQuintals: p.quantity,
      status: p.status,
      slotTime: `${p.slotStart || 'TBD'} - ${p.slotEnd || 'TBD'}`,
      scheduledDate: p.scheduledDate
    }));

    res.json({
      success: true,
      data: {
        stats: {
          todayScheduled: scheduledToday,
          qualityPending,
          completedToday,
          totalProcuredQuintals
        },
        arrivals
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getOfficerProcurements = async (req, res) => {
  try {
    const assignedCentres = req.user.assignedCentreIds;
    const procurements = await Procurement.find({ 
      centreId: { $in: assignedCentres } 
    }).populate('farmerId', 'name mobile').populate('centreId', 'name code').populate('cropId').populate('tokenId');
    
    res.json({ success: true, data: procurements });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getOfficerProcurementById = async (req, res) => {
  try {
    const { id } = req.params;
    const p = await Procurement.findOne({ 
      _id: id,
      centreId: { $in: req.user.assignedCentreIds }
    }).populate('farmerId', 'name mobile').populate('centreId', 'name code');
    
    if (!p) {
      return res.status(404).json({ success: false, message: 'Not found or not authorized' });
    }
    res.json({ success: true, data: p });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


export const submitQualityWeighment = async (req, res) => {
  try {
    const { procurementId } = req.params;
    const { actualWeight, moisture, grade, remarks, result } = req.body;

    const procurement = await Procurement.findOne({ 
      _id: procurementId, 
      centreId: { $in: req.user.assignedCentreIds } 
    }).populate('cropId');

    if (!procurement) {
      return res.status(403).json({ success: false, message: 'Not authorized for this procurement' });
    }

    const inspection = new QualityInspection({
      procurementId,
      officerId: req.user._id,
      expectedQuantity: procurement.quantity,
      actualWeight,
      moisture,
      grade,
      remarks,
      result
    });
    await inspection.save();

    if (result === 'ACCEPTED') {
      procurement.status = 'PROCURED';
      procurement.quantity = actualWeight;
      procurement.estimatedAmount = actualWeight * procurement.cropId.mspRate;
      await procurement.save();

      const payment = new Payment({
        procurementId: procurement._id,
        farmerId: procurement.farmerId,
        centreId: procurement.centreId,
        quantity: actualWeight,
        rate: procurement.cropId.mspRate,
        estimatedAmount: actualWeight * procurement.cropId.mspRate,
        status: 'PENDING'
      });
      await payment.save();

      await new Notification({ 
        userId: procurement.farmerId, 
        title: 'Procurement Successful', 
        message: `Your crop was accepted. Quality inspection passed. J-Form and Payment will be initiated shortly.` 
      }).save();
    } else {
       procurement.status = 'REGISTERED';
       await procurement.save();
    }

    res.json({ success: true, data: { procurement, inspection } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
