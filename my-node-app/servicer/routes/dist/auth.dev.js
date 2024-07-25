"use strict";

var express = require('express');

var router = express.Router();

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

var User = require('../models/User'); // Adjust the path if necessary


router.post('/signin', function _callee(req, res) {
  var _req$body, email, password, user, isMatch, token;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context.prev = 1;
          console.log("here!");
          console.log('email', email);
          _context.next = 6;
          return regeneratorRuntime.awrap(User.query().findOne({
            email: email
          }));

        case 6:
          user = _context.sent;

          if (user) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: 'Invalid email or password'
          }));

        case 9:
          _context.next = 11;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 11:
          isMatch = _context.sent;

          if (isMatch) {
            _context.next = 14;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: 'Invalid email or password'
          }));

        case 14:
          token = jwt.sign({
            id: user.id
          }, process.env.JWT_SECRET, {
            expiresIn: '1h'
          });
          res.json({
            token: token
          });
          _context.next = 22;
          break;

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](1);
          console.log(_context.t0);
          res.status(500).json({
            message: 'Server error'
          });

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 18]]);
});
module.exports = router;