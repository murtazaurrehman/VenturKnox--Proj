"use strict";

var Permission = require('../models/Permission'); // Adjust the path as necessary


exports.seed = function _callee(knex) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Permission.query().del());

        case 2:
          _context.next = 4;
          return regeneratorRuntime.awrap(Permission.query().insert([{
            id: 1,
            name: 'View Orders',
            objects_id: 1,
            methods_id: 1
          }, {
            id: 2,
            name: 'Create Orders',
            objects_id: 1,
            methods_id: 2
          }, {
            id: 3,
            name: 'Update Orders',
            objects_id: 1,
            methods_id: 3
          }, {
            id: 4,
            name: 'Delete Orders',
            objects_id: 1,
            methods_id: 4
          }, {
            id: 5,
            name: 'View Users',
            objects_id: 2,
            methods_id: 1
          }, {
            id: 6,
            name: 'Create Users',
            objects_id: 2,
            methods_id: 2
          }, {
            id: 7,
            name: 'Update Users',
            objects_id: 2,
            methods_id: 3
          }, {
            id: 8,
            name: 'Delete Users',
            objects_id: 2,
            methods_id: 4
          }, {
            id: 9,
            name: 'View Menu',
            objects_id: 3,
            methods_id: 1
          } // Add more permissions as needed
          ]));

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};