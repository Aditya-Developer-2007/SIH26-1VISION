import User from '../models/User.js';
import FarmerProfile from '../models/FarmerProfile.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { mobile, password } = req.body;

  try {
    const user = await User.findOne({ mobile });

    if (user && (await user.matchPassword(password))) {
      if (user.status !== 'ACTIVE') {
        return res.status(403).json({ success: false, message: 'Account is inactive' });
      }

      res.json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          mobile: user.mobile,
          role: user.role,
          assignedCentreIds: user.assignedCentreIds,
          token: generateToken(user._id),
        }
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid mobile number or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-passwordHash');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    let profileData = { ...user._doc };

    if (user.role === 'FARMER') {
      const farmerProfile = await FarmerProfile.findOne({ userId: user._id });
      if (farmerProfile) {
        profileData.farmerProfile = farmerProfile;
      }
    }

    res.json({ success: true, data: profileData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export { loginUser, getUserProfile };
