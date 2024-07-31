// accessControl.js
const rolePermissions = require('./rolePermissions');

function hasAccess(role, endpoint) {
  const permissions = rolePermissions[role];
  if (!permissions) {
    return false; // Role not found
  }
  return permissions.some(permission => endpoint.startsWith(permission));
}

module.exports = hasAccess;
