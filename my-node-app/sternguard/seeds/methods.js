exports.seed = function (knex) {
  return knex('permission_assignment').insert([
    // Owner Permissions
    { id: 1, role_id: 1, permission_id: 1 }, // Owner can view orders
    { id: 2, role_id: 1, permission_id: 2 }, // Owner can create orders
    { id: 3, role_id: 1, permission_id: 3 }, // Owner can update orders
    { id: 4, role_id: 1, permission_id: 4 }, // Owner can delete orders
    { id: 5, role_id: 1, permission_id: 5 }, // Owner can view users
    { id: 6, role_id: 1, permission_id: 6 }, // Owner can create users
    { id: 7, role_id: 1, permission_id: 7 }, // Owner can update users
    { id: 8, role_id: 1, permission_id: 8 }, // Owner can delete users
    { id: 9, role_id: 1, permission_id: 9 }, // Owner can view menu

    // Manager Permissions
    { id: 10, role_id: 2, permission_id: 1 }, // Manager can view orders
    { id: 11, role_id: 2, permission_id: 2 }, // Manager can create orders
    { id: 12, role_id: 2, permission_id: 3 }, // Manager can update orders
    { id: 13, role_id: 2, permission_id: 5 }, // Manager can view users
    { id: 14, role_id: 2, permission_id: 9 }, // Manager can view menu

    // Cashier Permissions
    { id: 15, role_id: 3, permission_id: 1 }, // Cashier can view orders
    { id: 16, role_id: 3, permission_id: 2 }, // Cashier can create orders

    // Waiter Permissions
    { id: 17, role_id: 4, permission_id: 1 }, // Waiter can view orders
    { id: 18, role_id: 4, permission_id: 9 }, // Waiter can view menu
  ]);
};
