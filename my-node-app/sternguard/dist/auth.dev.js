"use strict";

// verifyTokenAndGetUserRole.js
var jwt = require('jsonwebtoken');

var User = require('./models/User');

var hasAccess = require('./accessControl'); // Use environment variable for secret key or default to a hard-coded one


var secretKey = 'yoursecretkey'; // Function to verify the token and retrieve the user role

function verifyTokenAndGetUserRole(token) {
  var decoded, userId, user, role;
  return regeneratorRuntime.async(function verifyTokenAndGetUserRole$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          // Decode the JWT to get the user ID
          decoded = jwt.verify(token, secretKey);
          userId = decoded.id;
          console.log("Decoded Token: ".concat(JSON.stringify(decoded)));
          console.log("User ID: ".concat(userId)); // Retrieve the user from the database

          _context.next = 7;
          return regeneratorRuntime.awrap(User.query().findById(userId));

        case 7:
          user = _context.sent;

          if (user) {
            _context.next = 11;
            break;
          }

          console.error('User not found');
          throw new Error('User not found');

        case 11:
          // Extract the role from the access_token field
          role = user.access_token; // Assuming the access_token field contains the role

          if (role) {
            _context.next = 15;
            break;
          }

          console.error('Role not found in access_token');
          throw new Error('Role not found');

        case 15:
          console.log("User Role: ".concat(role));
          return _context.abrupt("return", role);

        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](0);
          console.error('Error verifying token:', _context.t0.message);
          throw new Error('Invalid token');

        case 23:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 19]]);
} // Middleware function to validate the token and check access permissions


function validateToken(req, res, next) {
  var token, role;
  return regeneratorRuntime.async(function validateToken$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          token = req.headers['authorization'];

          if (token) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", res.status(401).json({
            error: 'No token provided'
          }));

        case 3:
          _context2.prev = 3;
          _context2.next = 6;
          return regeneratorRuntime.awrap(verifyTokenAndGetUserRole(token));

        case 6:
          role = _context2.sent;

          if (hasAccess(role, req.originalUrl, req.method)) {
            _context2.next = 9;
            break;
          }

          return _context2.abrupt("return", res.status(403).json({
            error: 'Access denied'
          }));

        case 9:
          // Proceed to the next middleware or route handler
          next();
          _context2.next = 15;
          break;

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](3);
          return _context2.abrupt("return", res.status(401).json({
            error: _context2.t0.message
          }));

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[3, 12]]);
}

module.exports = {
  validateToken: validateToken
};