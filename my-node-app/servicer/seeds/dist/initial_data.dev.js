"use strict";

exports.seed = function _callee(knex) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(knex('permission_role').del());

        case 2:
          _context.next = 4;
          return regeneratorRuntime.awrap(knex('permissions').del());

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(knex('roles').del());

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(knex('users').del());

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(knex('menu').del());

        case 10:
          _context.next = 12;
          return regeneratorRuntime.awrap(knex('orders').del());

        case 12:
          _context.next = 14;
          return regeneratorRuntime.awrap(knex('order_items').del());

        case 14:
          _context.next = 16;
          return regeneratorRuntime.awrap(knex('bills').del());

        case 16:
          _context.next = 18;
          return regeneratorRuntime.awrap(knex('roles').insert([{
            role_name: 'Admin'
          }, {
            role_name: 'User'
          }]));

        case 18:
          _context.next = 20;
          return regeneratorRuntime.awrap(knex('permissions').insert([{
            permission_type: 'read',
            permission_name: 'Read Data'
          }, {
            permission_type: 'write',
            permission_name: 'Write Data'
          }]));

        case 20:
          _context.next = 22;
          return regeneratorRuntime.awrap(knex('permission_role').insert([{
            role_id: 1,
            permission_id: 1
          }, {
            role_id: 1,
            permission_id: 2
          }, {
            role_id: 2,
            permission_id: 1
          }]));

        case 22:
          _context.next = 24;
          return regeneratorRuntime.awrap(knex('users').insert([{
            username: 'admin',
            password: 'password123',
            role_id: 1
          }, {
            username: 'user',
            password: 'password123',
            role_id: 2
          }]));

        case 24:
          _context.next = 26;
          return regeneratorRuntime.awrap(knex('menu').insert([{
            item_name: 'Pizza',
            price: 12.99,
            description: 'Delicious cheese pizza'
          }, {
            item_name: 'Burger',
            price: 9.99,
            description: 'Juicy beef burger'
          }]));

        case 26:
          _context.next = 28;
          return regeneratorRuntime.awrap(knex('orders').insert([{
            table_number: 1,
            order_status: 'pending',
            taken_by: 2
          }]));

        case 28:
          _context.next = 30;
          return regeneratorRuntime.awrap(knex('order_items').insert([{
            order_id: 1,
            item_id: 1,
            quantity: 2,
            price: 12.99
          }]));

        case 30:
          _context.next = 32;
          return regeneratorRuntime.awrap(knex('bills').insert([{
            order_id: 1,
            total_amount: 25.98,
            generated_by: 2
          }]));

        case 32:
        case "end":
          return _context.stop();
      }
    }
  });
};