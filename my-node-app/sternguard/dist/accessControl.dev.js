"use strict";

// accessControl.js
var rolePermissions = require('./rolePermissions');

function hasAccess(role, endpoint) {
  var permissions = rolePermissions[role];

  if (!permissions) {
    return false; // Role not found
  }

  return permissions.some(function (permission) {
    return endpoint.startsWith(permission);
  });
}

module.exports = hasAccess;