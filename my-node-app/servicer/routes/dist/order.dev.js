"use strict";

var express = require('express');

var Order = require('../models/Order');

var router = express.Router(); // Route to create a new order

router.post('/', function _callee(req, res) {
  var _req$body, table_number, order_status, taken_by, taken_at, newOrder;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, table_number = _req$body.table_number, order_status = _req$body.order_status, taken_by = _req$body.taken_by, taken_at = _req$body.taken_at;

          if (!(table_number === undefined || !order_status || taken_by === undefined)) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: 'Table number, order status, and taken by are required'
          }));

        case 3:
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(Order.query().insert({
            table_number: table_number,
            order_status: order_status,
            taken_by: taken_by,
            taken_at: taken_at
          }));

        case 6:
          newOrder = _context.sent;
          res.status(201).json({
            message: 'Order created successfully',
            order: newOrder
          });
          _context.next = 14;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](3);
          console.error(_context.t0);
          res.status(500).json({
            message: 'Internal server error'
          });

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 10]]);
}); // Route to cancel an order

router.patch('/cancel/:order_id', function _callee2(req, res) {
  var order_id, order;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          order_id = req.params.order_id;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(Order.query().findById(order_id));

        case 4:
          order = _context2.sent;

          if (order) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            message: 'Order not found'
          }));

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(Order.query().patchAndFetchById(order_id, {
            order_status: 'canceled'
          }));

        case 9:
          res.status(200).json({
            message: 'Order canceled successfully'
          });
          _context2.next = 16;
          break;

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](1);
          console.error(_context2.t0);
          res.status(500).json({
            message: 'Internal server error'
          });

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 12]]);
}); // Route to update an order

router.patch('/:order_id', function _callee3(req, res) {
  var order_id, _req$body2, table_number, order_status, taken_by, taken_at, order, updatedOrder;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          order_id = req.params.order_id;
          _req$body2 = req.body, table_number = _req$body2.table_number, order_status = _req$body2.order_status, taken_by = _req$body2.taken_by, taken_at = _req$body2.taken_at;

          if (!(!table_number && !order_status && taken_by === undefined && !taken_at)) {
            _context3.next = 4;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            message: 'At least one field (table_number, order_status, taken_by, taken_at) is required for update'
          }));

        case 4:
          _context3.prev = 4;
          _context3.next = 7;
          return regeneratorRuntime.awrap(Order.query().findById(order_id));

        case 7:
          order = _context3.sent;

          if (order) {
            _context3.next = 10;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            message: 'Order not found'
          }));

        case 10:
          _context3.next = 12;
          return regeneratorRuntime.awrap(Order.query().patchAndFetchById(order_id, {
            table_number: table_number,
            order_status: order_status,
            taken_by: taken_by,
            taken_at: taken_at
          }));

        case 12:
          updatedOrder = _context3.sent;
          res.status(200).json({
            message: 'Order updated successfully',
            order: updatedOrder
          });
          _context3.next = 20;
          break;

        case 16:
          _context3.prev = 16;
          _context3.t0 = _context3["catch"](4);
          console.error(_context3.t0);
          res.status(500).json({
            message: 'Internal server error'
          });

        case 20:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[4, 16]]);
}); // Route to get an order by ID

router.get('/:order_id', function _callee4(req, res) {
  var order_id, order;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          order_id = req.params.order_id;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(Order.query().findById(order_id));

        case 4:
          order = _context4.sent;

          if (order) {
            _context4.next = 7;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            message: 'Order not found'
          }));

        case 7:
          res.status(200).json({
            order: order
          });
          _context4.next = 14;
          break;

        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](1);
          console.error(_context4.t0);
          res.status(500).json({
            message: 'Internal server error'
          });

        case 14:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 10]]);
}); // Route to get all orders

router.get('/', function _callee5(req, res) {
  var orders;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Order.query());

        case 3:
          orders = _context5.sent;
          res.status(200).json({
            orders: orders
          });
          _context5.next = 11;
          break;

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          console.error(_context5.t0);
          res.status(500).json({
            message: 'Internal server error'
          });

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
module.exports = router;