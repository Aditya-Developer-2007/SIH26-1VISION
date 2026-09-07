import Centre from '../models/Centre.js';

export const getCentres = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    if (search) {
      const q = search.toLowerCase();
      query = { name: { $regex: q, $options: 'i' } };
    }
    const centres = await Centre.find(query);
    return res.status(200).json({ success: true, centres });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getCentreById = async (req, res) => {
  try {
    const { id } = req.params;
    const centre = await Centre.findById(id);
    return res.status(200).json({ success: true, centre });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

import Slot from '../models/Slot.js';

export const getCentreSlots = async (req, res) => {
  try {
    const { id } = req.params;
    const { date } = req.query; // format YYYY-MM-DD
    
    if (!date) return res.status(400).json({ success: false, message: 'Date is required' });

    // Find slots for this centre and date
    const slots = await Slot.find({ centreId: id, date }).sort({ startTime: 1 });
    
    // We will generate the default template of slots if they don't exist yet, 
    // to show fill percentages for UI even if nobody has booked.
    const defaultTimeSlots = [
      { startTime: '09:00', endTime: '12:00' },
      { startTime: '12:00', endTime: '15:00' },
      { startTime: '15:00', endTime: '18:00' }
    ];

    const slotData = defaultTimeSlots.map(ts => {
      const existing = slots.find(s => s.startTime === ts.startTime);
      const capacity = existing ? existing.capacity : 50;
      const bookedCount = existing ? existing.bookedCount : 0;
      const status = existing ? existing.status : 'open';
      const fillPercentage = Math.round((bookedCount / capacity) * 100);

      return {
        ...ts,
        capacity,
        bookedCount,
        status,
        fillPercentage
      };
    });

    return res.status(200).json({ success: true, data: slotData });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
