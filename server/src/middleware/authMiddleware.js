import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const requireAuth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
      
      req.user = await User.findById(decoded.id).select('-passwordHash');
      
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Not authorized, user not found' });
      }

      if (req.user.status !== 'ACTIVE') {
        return res.status(403).json({ success: false, message: 'Account is inactive' });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ success: false, message: 'Not authorized, no token' });
  }
};

const requireRole = (role) => {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      next();
    } else {
      res.status(403).json({ success: false, message: `Not authorized as ${role}` });
    }
  };
};

const requireCentreAccess = (req, res, next) => {
  if (req.user.role === 'ADMIN') {
    return next(); // Admin has universal access
  }

  if (req.user.role === 'OFFICER') {
    const requestedCentreId = req.params.centreId || req.query.centreId || req.body.centreId;
    
    // If a specific centre is requested, verify access
    if (requestedCentreId) {
      const hasAccess = req.user.assignedCentreIds.some(id => id.toString() === requestedCentreId.toString());
      if (!hasAccess) {
        return res.status(403).json({ success: false, message: 'Not authorized for this centre' });
      }
    }
    next();
  } else {
    res.status(403).json({ success: false, message: 'Role does not support centre access validation' });
  }
};

const requireSelfAccess = (req, res, next) => {
  if (req.user.role === 'ADMIN') {
    return next();
  }
  if (req.user.role === 'FARMER') {
    const requestedFarmerId = req.params.farmerId || req.query.farmerId || req.body.farmerId;
    if (requestedFarmerId && requestedFarmerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to access another farmer\'s data' });
    }
  }
  next();
};

export { requireAuth, requireRole, requireCentreAccess, requireSelfAccess };
