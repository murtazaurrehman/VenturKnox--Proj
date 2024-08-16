"use strict";

var jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  var token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({
      message: 'No token, authorization denied'
    });
  }

  try {
    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Token is not valid'
    });
  }
};