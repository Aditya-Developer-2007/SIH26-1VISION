import { demoStore } from '../utils/demoStore.js';

export const getOfficerDashboard = async (req, res) => {
  try {
    const centre = demoStore.centres[0]; // Mandi Bhawan
    const arrivals = demoStore.procurements;

    const stats = {
      todayScheduled: arrivals.length + 8,
      completedToday: 14,
      qualityPending: arrivals.filter(p => p.status === 'SCHEDULED' || p.status === 'QUALITY_CHECK').length,
      paymentPending: 3,
      totalProcuredQuintals: 412.5
    };

    return res.status(200).json({
      success: true,
      centre,
      stats,
      arrivals
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyTokenAndGetDetails = async (req, res) => {
  try {
    const { tokenNumber } = req.params;
    const token = demoStore.tokens.find(t => t.tokenNumber.toUpperCase() === tokenNumber.toUpperCase());
    
    if (!token) {
      return res.status(404).json({ success: false, message: `Token ${tokenNumber} not found in system registry` });
    }

    const procurement = demoStore.procurements.find(p => p.id === token.procurementId) || demoStore.procurements[0];
    const farmer = demoStore.users.find(u => u.id === token.farmerId) || demoStore.users[0];

    return res.status(200).json({
      success: true,
      token,
      procurement,
      farmer
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const submitQualityAndWeighment = async (req, res) => {
  try {
    const { procurementId, actualWeightQuintals, moisturePct, qualityGrade, remarks } = req.body;
    
    const proc = demoStore.procurements.find(p => p.id === procurementId || p.tokenId === procurementId);
    if (!proc) {
      return res.status(404).json({ success: false, message: "Procurement record not found" });
    }

    const actualQty = Number(actualWeightQuintals) || proc.estimatedQuantityQuintals;
    const totalAmt = actualQty * proc.mspPerQuintal;

    proc.actualWeightQuintals = actualQty;
    proc.moisturePct = Number(moisturePct) || 10.8;
    proc.qualityGrade = qualityGrade || "Grade A";
    proc.totalAmount = totalAmt;
    proc.status = "PROCURED";
    proc.paymentStatus = "INITIATED";

    // Update journey steps
    proc.journeySteps = proc.journeySteps.map(step => {
      if (step.key === 'quality_check') {
        return { ...step, status: 'completed', timestamp: 'Today, 11:45 AM', note: `Inspected: ${qualityGrade}, Moisture: ${moisturePct}%` };
      }
      if (step.key === 'procurement') {
        return { ...step, status: 'completed', timestamp: 'Today, 12:00 PM', note: `Weighment verified: ${actualQty} Quintals. J-Form Issued.` };
      }
      if (step.key === 'payment_initiated') {
        return { ...step, status: 'active', timestamp: 'Today, 12:15 PM', note: `DBT Payment Pipeline initiated for ₹${totalAmt.toLocaleString('en-IN')}` };
      }
      return step;
    });

    // Update or create payment entry
    let payment = demoStore.payments.find(p => p.procurementId === proc.id);
    if (payment) {
      payment.quantityQuintals = actualQty;
      payment.totalAmount = totalAmt;
      payment.status = "INITIATED";
      payment.timeline[0].done = true;
      payment.timeline[1].done = true;
      payment.timeline[2].done = true;
      payment.timeline[2].active = true;
    } else {
      payment = {
        id: `pay_${Date.now()}`,
        paymentNumber: `PAY-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        procurementId: proc.id,
        farmerId: proc.farmerId,
        farmerName: proc.farmerName,
        cropName: proc.cropName,
        quantityQuintals: actualQty,
        mspPerQuintal: proc.mspPerQuintal,
        totalAmount: totalAmt,
        bankName: "State Bank of India",
        maskedAccount: "XXXX XXXX 4812",
        ifsc: "SBIN0001234",
        utrReference: `UTR${Math.floor(100000000000 + Math.random() * 900000000000)}`,
        status: "INITIATED",
        initiatedAt: "Today, 12:15 PM",
        expectedCreditAt: "Tomorrow, 04:00 PM",
        timeline: [
          { label: "Procurement Completed", date: "Today, 12:00 PM", done: true },
          { label: "J-Form & Bill Generated", date: "Today, 12:05 PM", done: true },
          { label: "Payment Initiated (DBT Pipeline)", date: "Today, 12:15 PM", done: true, active: true },
          { label: "Bank Account Credit", date: "Expected Tomorrow, 04:00 PM", done: false }
        ]
      };
      demoStore.payments.unshift(payment);
    }

    // Add generated J-Form document
    demoStore.documents.unshift({
      id: `doc_${Date.now()}`,
      docType: "J-FORM",
      title: "J-Form Procurement Receipt",
      docNumber: `JFORM-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      date: "Today",
      farmerName: proc.farmerName,
      crop: `${proc.cropName} (${actualQty} Quintal)`,
      amount: `₹${totalAmt.toLocaleString('en-IN')}`,
      status: "AVAILABLE",
      fileUrl: `/api/documents/download/jform_${proc.id}`
    });

    // Send notification
    demoStore.notifications.unshift({
      id: `notif_${Date.now()}`,
      farmerId: proc.farmerId,
      title: "Quality Check & Weighment Completed",
      message: `Your ${proc.cropName} (${actualQty} Quintals) passed inspection (${qualityGrade}). J-Form generated and DBT Payment of ₹${totalAmt.toLocaleString('en-IN')} initiated!`,
      category: "PAYMENTS",
      timestamp: "Just now",
      read: false
    });

    return res.status(200).json({
      success: true,
      message: "Quality inspection and weighment recorded successfully",
      procurement: proc,
      payment
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
