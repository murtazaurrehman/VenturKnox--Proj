// verifyTokenAndGetUserRole.js
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const hasAccess = require('./accessControl');

// Use environment variable for secret key or default to a hard-coded one
const secretKey = 'yoursecretkey';

// Function to verify the token and retrieve the user role
async function verifyTokenAndGetUserRole(token) {
  try {
    // Decode the JWT to get the user ID
    const decoded = jwt.verify(token, secretKey);
    const userId = decoded.id;

    console.log(`Decoded Token: ${JSON.stringify(decoded)}`);
    console.log(`User ID: ${userId}`);

    // Retrieve the user from the database
    const user = await User.query().findById(userId);

    if (!user) {
      console.error('User not found');
      throw new Error('User not found');
    }

    // Extract the role from the access_token field
    const role = user.access_token; // Assuming the access_token field contains the role

    if (!role) {
      console.error('Role not found in access_token');
      throw new Error('Role not found');
    }

    console.log(`User Role: ${role}`);
    return role;
  } catch (err) {
    console.error('Error verifying token:', err.message);
    throw new Error('Invalid token');
  }
}


// Middleware function to validate the token and check access permissions
async function validateToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    // Verify the token and retrieve the user's role
    const role = await verifyTokenAndGetUserRole(token);

    // Check if the user has access to the requested URL
    if (!hasAccess(role, req.originalUrl, req.method)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
}

module.exports = { validateToken };
