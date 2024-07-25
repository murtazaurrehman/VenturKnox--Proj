"use strict";

var express = require('express');

var Menu = require('../models/Menu');

var router = express.Router(); // Route to get the menu item

router.get('/', function _callee(req, res) {
  var menuItem;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Menu.query().first());

        case 3:
          menuItem = _context.sent;

          if (menuItem) {
            res.json(menuItem);
          } else {
            res.status(404).json({
              message: 'Menu item not found'
            });
          }

          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          res.status(500).json({
            message: 'Internal server error'
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // Route to create or update the menu item

router.post('/', function _callee2(req, res) {
  var _req$body, item_name, price, description, menuItem;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, item_name = _req$body.item_name, price = _req$body.price, description = _req$body.description;

          if (!(!item_name || !price)) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: 'Item name and price are required'
          }));

        case 3:
          _context2.prev = 3;
          _context2.next = 6;
          return regeneratorRuntime.awrap(Menu.query().first());

        case 6:
          menuItem = _context2.sent;

          if (!menuItem) {
            _context2.next = 14;
            break;
          }

          _context2.next = 10;
          return regeneratorRuntime.awrap(Menu.query().patchAndFetchById(menuItem.item_id, {
            item_name: item_name,
            price: price,
            description: description
          }));

        case 10:
          menuItem = _context2.sent;
          res.status(200).json({
            message: 'Menu item updated successfully',
            menuItem: menuItem
          });
          _context2.next = 18;
          break;

        case 14:
          _context2.next = 16;
          return regeneratorRuntime.awrap(Menu.query().insert({
            item_name: item_name,
            price: price,
            description: description
          }));

        case 16:
          menuItem = _context2.sent;
          res.status(201).json({
            message: 'Menu item created successfully',
            menuItem: menuItem
          });

        case 18:
          _context2.next = 24;
          break;

        case 20:
          _context2.prev = 20;
          _context2.t0 = _context2["catch"](3);
          console.error(_context2.t0);
          res.status(500).json({
            message: 'Internal server error'
          });

        case 24:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[3, 20]]);
}); // Route to partially update the menu item

router.patch('/', function _callee3(req, res) {
  var _req$body2, item_name, price, description, menuItem, updatedItem;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body2 = req.body, item_name = _req$body2.item_name, price = _req$body2.price, description = _req$body2.description;

          if (!(!item_name && !price && !description)) {
            _context3.next = 3;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            message: 'At least one field (item_name, price, or description) is required for update'
          }));

        case 3:
          _context3.prev = 3;
          _context3.next = 6;
          return regeneratorRuntime.awrap(Menu.query().first());

        case 6:
          menuItem = _context3.sent;

          if (!menuItem) {
            _context3.next = 14;
            break;
          }

          _context3.next = 10;
          return regeneratorRuntime.awrap(Menu.query().patchAndFetchById(menuItem.item_id, {
            item_name: item_name,
            price: price,
            description: description
          }));

        case 10:
          updatedItem = _context3.sent;
          res.status(200).json({
            message: 'Menu item partially updated successfully',
            updatedItem: updatedItem
          });
          _context3.next = 15;
          break;

        case 14:
          res.status(404).json({
            message: 'Menu item not found'
          });

        case 15:
          _context3.next = 21;
          break;

        case 17:
          _context3.prev = 17;
          _context3.t0 = _context3["catch"](3);
          console.error(_context3.t0);
          res.status(500).json({
            message: 'Internal server error'
          });

        case 21:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[3, 17]]);
}); // Route to delete the menu item

router["delete"]('/', function _callee4(req, res) {
  var menuItem;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Menu.query().first());

        case 3:
          menuItem = _context4.sent;

          if (!menuItem) {
            _context4.next = 10;
            break;
          }

          _context4.next = 7;
          return regeneratorRuntime.awrap(Menu.query().deleteById(menuItem.item_id));

        case 7:
          res.status(204).send();
          _context4.next = 11;
          break;

        case 10:
          res.status(404).json({
            message: 'Menu item not found'
          });

        case 11:
          _context4.next = 17;
          break;

        case 13:
          _context4.prev = 13;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);
          res.status(500).json({
            message: 'Internal server error'
          });

        case 17:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 13]]);
});
module.exports = router;