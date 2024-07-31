// verifyTokenAndGetUserRole.js
const jwt = require('jsonwebtoken');
const hasAccess = require('./accessControl');

const secretKey = 'your-secret-key'; // Replace with your actual secret key

function verifyTokenAndGetUserRole(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded.role;
  } catch (err) {
    throw new Error('Invalid token');
  }
}

function validateToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const role = verifyTokenAndGetUserRole(token);

    if (!hasAccess(role, req.originalUrl)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = { validateToken };
