import { demoStore } from '../utils/demoStore.js';

export const getFarmerDashboard = async (req, res) => {
  try {
    const farmerId = req.user?.id || 'u_farmer_1';
    const farmer = demoStore.users.find(u => u.id === farmerId) || demoStore.users[0];
    
    // Primary procurement active record
    const procurement = demoStore.procurements.find(p => p.farmerId === farmer.id) || demoStore.procurements[0];
    const token = demoStore.tokens.find(t => t.procurementId === procurement.id) || demoStore.tokens[0];
    const payment = demoStore.payments.find(p => p.procurementId === procurement.id) || demoStore.payments[0];
    const notifications = demoStore.notifications.filter(n => n.farmerId === farmer.id);
    const centres = demoStore.centres.slice(0, 3);

    // Smart AgroCure AI insight
    const smartInsight = {
      title: "AgroCure Smart Queue Insight",
      text: "Based on current Mandi Bhawan activity (82% capacity, 34 farmers in queue), morning slots (10:00 AM - 11:30 AM) have an average weighment wait time of 18 minutes. Arrive 15 minutes prior with printed token.",
      recommendedCentre: "Mandi Bhawan, Sector 12",
      estimatedWaitMin: 18
    };

    return res.status(200).json({
      success: true,
      farmer,
      todayAction: {
        title: "Your wheat procurement is scheduled for tomorrow.",
        timeSlot: "10:00 AM – 12:00 PM",
        centreName: "Mandi Bhawan, Sector 12",
        distanceKm: 2.4,
        tokenNumber: "AGRO-2048",
        checklist: ["Aadhaar Card", "Land Record (HR-FBD-2024-8841)", "Digital Token Pass (AGRO-2048)"]
      },
      activeProcurement: procurement,
      token,
      payment,
      journeySteps: procurement.journeySteps,
      nearbyCentres: centres,
      notifications,
      smartInsight
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const registerCropAndBookSlot = async (req, res) => {
  try {
    const { cropId, areaAcres, estimatedQuintals, centreId, preferredDate, preferredTime } = req.body;
    
    const crop = demoStore.crops.find(c => c.id === cropId) || demoStore.crops[0];
    const centre = demoStore.centres.find(c => c.id === centreId) || demoStore.centres[0];
    
    const newProcId = `proc_${Date.now()}`;
    const newTokenId = `AGRO-${Math.floor(1000 + Math.random() * 9000)}`;
    const estimatedAmt = Number(estimatedQuintals) * crop.mspPerQuintal;

    const newProcurement = {
      id: newProcId,
      procurementNumber: `PROC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      farmerId: req.user?.id || 'u_farmer_1',
      farmerName: req.user?.name || 'Ramesh Kumar',
      farmerPhone: req.user?.phone || '9876543210',
      cropId: crop.id,
      cropName: crop.name,
      estimatedQuantityQuintals: Number(estimatedQuintals),
      actualWeightQuintals: Number(estimatedQuintals),
      mspPerQuintal: crop.mspPerQuintal,
      totalAmount: estimatedAmt,
      centreId: centre.id,
      centreName: centre.name,
      tokenId: newTokenId,
      slotDate: preferredDate || "2026-09-02",
      slotTime: preferredTime || "10:00 AM - 12:00 PM",
      status: "SCHEDULED",
      paymentStatus: "PENDING",
      createdAt: new Date().toISOString(),
      journeySteps: [
        { key: "registration", label: "Registration", status: "completed", timestamp: "Just now", note: "Crop registered successfully" },
        { key: "verification", label: "Verification", status: "completed", timestamp: "Automated check pass", note: "Land record verified" },
        { key: "token_generated", label: "Token Generated", status: "completed", timestamp: "Just now", note: `Token ${newTokenId} issued` },
        { key: "slot_scheduled", label: "Procurement Visit", status: "active", timestamp: `${preferredDate}, ${preferredTime}`, note: `Slot confirmed at ${centre.name}` },
        { key: "quality_check", label: "Quality & Weighment", status: "pending", timestamp: "Upcoming", note: "Centre quality check" },
        { key: "procurement", label: "Procurement Completed", status: "pending", timestamp: "Upcoming", note: "Weighment slip generation" },
        { key: "payment_initiated", label: "Payment Initiated", status: "pending", timestamp: "Upcoming", note: "DBT Direct Bank Transfer" },
        { key: "payment_received", label: "Payment Received", status: "pending", timestamp: "Upcoming", note: "Bank credit confirmation" }
      ]
    };

    demoStore.procurements.unshift(newProcurement);

    const newToken = {
      id: `token_${Date.now()}`,
      tokenNumber: newTokenId,
      procurementId: newProcId,
      farmerId: req.user?.id || 'u_farmer_1',
      farmerName: req.user?.name || 'Ramesh Kumar',
      cropName: crop.name,
      quantityQuintals: Number(estimatedQuintals),
      centreName: centre.name,
      centreAddress: centre.address,
      slotDate: preferredDate || "02 September 2026",
      slotTime: preferredTime || "10:00 AM - 12:00 PM",
      status: "CONFIRMED",
      qrCodeData: `AGROCURE|${newTokenId}|RAMESH_KUMAR|${crop.name}|${estimatedQuintals}Q|${centre.name}`,
      requiredDocs: [
        "Aadhaar Card (Original)",
        "Land Record Ownership Document",
        "Bank Account Details",
        "AgroCure Token Pass"
      ]
    };

    demoStore.tokens.unshift(newToken);

    // Create notification
    demoStore.notifications.unshift({
      id: `notif_${Date.now()}`,
      farmerId: req.user?.id || 'u_farmer_1',
      title: `Token ${newTokenId} Confirmed`,
      message: `Your procurement slot for ${crop.name} (${estimatedQuintals} Quintals) at ${centre.name} is confirmed for ${preferredDate} at ${preferredTime}.`,
      category: "UPDATES",
      timestamp: "Just now",
      read: false
    });

    return res.status(201).json({
      success: true,
      message: "Crop registered and token generated successfully",
      procurement: newProcurement,
      token: newToken
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getProcurementById = async (req, res) => {
  try {
    const { id } = req.params;
    const procurement = demoStore.procurements.find(p => p.id === id || p.procurementNumber === id || p.tokenId === id) || demoStore.procurements[0];
    const token = demoStore.tokens.find(t => t.procurementId === procurement.id || t.tokenNumber === procurement.tokenId);
    const payment = demoStore.payments.find(p => p.procurementId === procurement.id);

    return res.status(200).json({
      success: true,
      procurement,
      token,
      payment
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getDocuments = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      documents: demoStore.documents
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
