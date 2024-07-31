"use strict";

// verifyTokenAndGetUserRole.js
var jwt = require('jsonwebtoken');

var hasAccess = require('./accessControl');

var secretKey = 'your-secret-key'; // Replace with your actual secret key

function verifyTokenAndGetUserRole(token) {
  try {
    var decoded = jwt.verify(token, secretKey);
    return decoded.role;
  } catch (err) {
    throw new Error('Invalid token');
  }
}

function validateToken(req, res, next) {
  var token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({
      error: 'No token provided'
    });
  }

  try {
    var role = verifyTokenAndGetUserRole(token);

    if (!hasAccess(role, req.originalUrl)) {
      return res.status(403).json({
        error: 'Access denied'
      });
    }

    next();
  } catch (err) {
    return res.status(401).json({
      error: 'Invalid token'
    });
  }
}

module.exports = {
  validateToken: validateToken
};