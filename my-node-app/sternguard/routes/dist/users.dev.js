"use strict";

var express = require('express');

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

var User = require('../models/User');

var router = express.Router();
var SECRET_KEY = 'yoursecretkey'; // Login route

router.post('/login', function _callee(req, res) {
  var _req$body, email, password, user, isPasswordValid, token;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(User.query().findOne({
            email: email
          }));

        case 4:
          user = _context.sent;

          if (user) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: 'Invalid email or password'
          }));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 9:
          isPasswordValid = _context.sent;

          if (isPasswordValid) {
            _context.next = 12;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: 'Invalid email or password'
          }));

        case 12:
          console.log(user);
          token = jwt.sign({
            id: user.id,
            token: user.access_token
          }, SECRET_KEY, {
            expiresIn: '1h'
          });
          res.json({
            token: token
          });
          console.log(token); // If login is successful, send a success response
          // res.json({ message: 'Login successful' });

          _context.next = 22;
          break;

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](1);
          console.error(_context.t0); // Log the error for debugging

          res.status(500).json({
            message: 'Internal server error'
          });

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 18]]);
});
router.post('/signup', function _callee2(req, res) {
  var _req$body2, email, password, name, existingUser, hashedPassword, newUser;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password, name = _req$body2.name;

          if (!(!email || !password || !name)) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: 'Email, password, and name are required'
          }));

        case 3:
          _context2.prev = 3;
          _context2.next = 6;
          return regeneratorRuntime.awrap(User.query().findOne({
            email: email
          }));

        case 6:
          existingUser = _context2.sent;

          if (!existingUser) {
            _context2.next = 9;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: 'Email already in use'
          }));

        case 9:
          _context2.next = 11;
          return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

        case 11:
          hashedPassword = _context2.sent;
          _context2.next = 14;
          return regeneratorRuntime.awrap(User.query().insert({
            email: email,
            password: hashedPassword,
            name: name
          }));

        case 14:
          newUser = _context2.sent;
          res.status(201).json({
            message: 'User created successfully',
            user: newUser
          });
          _context2.next = 22;
          break;

        case 18:
          _context2.prev = 18;
          _context2.t0 = _context2["catch"](3);
          console.error(_context2.t0); // Log the error for debugging

          res.status(500).json({
            message: 'Internal server error'
          });

        case 22:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[3, 18]]);
});
module.exports = router;