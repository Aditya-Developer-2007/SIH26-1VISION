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
