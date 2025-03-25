// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log('Authorization Header:', authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.error('No or invalid Authorization header');
    return res.status(403).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    console.error('Token missing after "Bearer"');
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded JWT:', user);
    if (!user.userId) { // Changed from user.id to user.userId
      console.error('JWT missing userId field:', user);
      return res.status(403).json({ message: 'Invalid token: No user ID' });
    }
    req.user = { id: user.userId, ...user }; // Map userId to id for consistency
    next();
  } catch (err) {
    console.error('JWT Verification Error:', err);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authenticateJWT;