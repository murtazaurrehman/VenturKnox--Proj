// rolePermissions.js
const rolePermissions = {
    owner: [
      '/servicer/',
      '/servicer/orders',
      '/servicer/menu',
      '/servicer/users',
      '/sternguard/',
      '/httpbin/',
      // Add other endpoints the owner has access to
    ],
    manager: [
      '/servicer/',
      '/servicer/orders',
      '/servicer/menu',
      '/sternguard/',
      // Add other endpoints the manager has access to
    ],
    cashier: [
      '/servicer/orders',
      // Add other endpoints the cashier has access to
    ],
    waiter: [
      '/servicer/menu',
      // Add other endpoints the waiter has access to
    ]
  };
  
  module.exports = rolePermissions;
  