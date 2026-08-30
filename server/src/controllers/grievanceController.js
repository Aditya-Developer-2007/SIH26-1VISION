import { demoStore } from '../utils/demoStore.js';

export const getGrievances = async (req, res) => {
  try {
    const grievances = demoStore.grievances;
    return res.status(200).json({ success: true, grievances });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createGrievance = async (req, res) => {
  try {
    const { category, subject, description } = req.body;
    
    const newGrievance = {
      id: `grv_${Date.now()}`,
      ticketNumber: `GRV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      farmerId: req.user?.id || 'u_farmer_1',
      farmerName: req.user?.name || 'Ramesh Kumar',
      farmerPhone: req.user?.phone || '9876543210',
      category: category || 'PAYMENT',
      subject,
      description,
      status: 'SUBMITTED',
      createdAt: 'Just now',
      updatedAt: 'Just now'
    };

    demoStore.grievances.unshift(newGrievance);

    return res.status(201).json({
      success: true,
      message: 'Grievance submitted successfully',
      grievance: newGrievance
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const respondGrievance = async (req, res) => {
  try {
    const { id } = req.params;
    const { response, status = 'RESOLVED' } = req.body;

    const grv = demoStore.grievances.find(g => g.id === id || g.ticketNumber === id);
    if (!grv) {
      return res.status(404).json({ success: false, message: 'Grievance ticket not found' });
    }

    grv.response = response;
    grv.status = status;
    grv.updatedAt = 'Just now';

    return res.status(200).json({
      success: true,
      message: 'Grievance response updated',
      grievance: grv
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
