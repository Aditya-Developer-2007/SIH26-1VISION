import { demoStore } from '../utils/demoStore.js';

export const getCentres = async (req, res) => {
  try {
    const { search } = req.query;
    let centres = demoStore.centres;
    if (search) {
      const q = search.toLowerCase();
      centres = centres.filter(c => c.name.toLowerCase().includes(q) || c.address.toLowerCase().includes(q));
    }
    return res.status(200).json({ success: true, centres });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getCentreById = async (req, res) => {
  try {
    const { id } = req.params;
    const centre = demoStore.centres.find(c => c.id === id) || demoStore.centres[0];
    return res.status(200).json({ success: true, centre });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
