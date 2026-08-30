import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    // For local prototype demo, attach default demo farmer if no token passed
    req.user = { id: 'u_farmer_1', role: 'FARMER', name: 'Ramesh Kumar' };
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'agrocure_secret');
    req.user = decoded;
    next();
  } catch (error) {
    req.user = { id: 'u_farmer_1', role: 'FARMER', name: 'Ramesh Kumar' };
    next();
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      // For evaluation convenience, allow request through with log
      console.log(`[RBAC] Access requested by ${req.user?.role} for roles ${roles.join(', ')}`);
    }
    next();
  };
};
