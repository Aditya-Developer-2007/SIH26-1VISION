import Grievance from '../models/Grievance.js';

export const getGrievances = async (req, res) => {
  try {
    const query = req.user.role === 'ADMIN' ? {} : (req.user.role === 'OFFICER' ? { centreId: { $in: req.user.assignedCentreIds } } : { farmerId: req.user._id });
    const grievances = await Grievance.find(query).populate('farmerId', 'name mobile');
    return res.status(200).json({ success: true, grievances });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createGrievance = async (req, res) => {
  try {
    const { category, subject, description, centreId } = req.body;
    
    const newGrievance = new Grievance({
      farmerId: req.user._id,
      centreId,
      category: category || 'PAYMENT',
      subject,
      description,
      status: 'SUBMITTED'
    });

    await newGrievance.save();

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

    const grv = await Grievance.findById(id);
    if (!grv) {
      return res.status(404).json({ success: false, message: 'Grievance ticket not found' });
    }

    grv.response = response;
    grv.status = status;
    await grv.save();

    return res.status(200).json({
      success: true,
      message: 'Grievance response updated',
      grievance: grv
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
