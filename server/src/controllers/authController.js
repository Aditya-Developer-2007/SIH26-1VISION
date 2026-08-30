import jwt from 'jsonwebtoken';
import { demoStore } from '../utils/demoStore.js';

export const login = async (req, res) => {
  try {
    const { phone, role = 'FARMER' } = req.body;
    
    // Find matching user or fallback to primary demo user for role
    let user = demoStore.users.find(u => u.phone === phone || u.role === role);
    if (!user) {
      user = demoStore.users[0]; // Fallback to Ramesh Kumar
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, name: user.name, phone: user.phone },
      process.env.JWT_SECRET || 'agrocure_secret',
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully. Use demo code: 123456",
      token,
      user
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { phone, otp, role = 'FARMER' } = req.body;
    
    if (otp !== '123456' && otp !== '000000') {
      return res.status(400).json({ success: false, message: "Invalid OTP. For prototype demo use 123456" });
    }

    let user = demoStore.users.find(u => u.phone === phone && u.role === role);
    if (!user) {
      user = demoStore.users.find(u => u.role === role) || demoStore.users[0];
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, name: user.name, phone: user.phone },
      process.env.JWT_SECRET || 'agrocure_secret',
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      success: true,
      token,
      user
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const userId = req.user?.id || 'u_farmer_1';
    const user = demoStore.users.find(u => u.id === userId) || demoStore.users[0];
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
