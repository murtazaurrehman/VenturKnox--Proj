"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var bcrypt = require('bcrypt');

var _require = require('objection'),
    Model = _require.Model;

var knexConfig = require('../knexfile'); // Adjust the path if necessary


var knex = require('knex')(knexConfig.development); // Use the appropriate environment
// Bind all Models to the knex instance


Model.knex(knex); // Define your User model (if not defined elsewhere)

var User =
/*#__PURE__*/
function (_Model) {
  _inherits(User, _Model);

  function User() {
    _classCallCheck(this, User);

    return _possibleConstructorReturn(this, _getPrototypeOf(User).apply(this, arguments));
  }

  _createClass(User, null, [{
    key: "tableName",
    get: function get() {
      return 'users';
    }
  }]);

  return User;
}(Model); // Export the seed function


exports.seed = function _callee4(knex) {
  var hashedPassword, hashedPassword1, hashedPassword2;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(knex.schema.hasTable('tokens').then(function _callee(exists) {
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (!exists) {
                      _context.next = 3;
                      break;
                    }

                    _context.next = 3;
                    return regeneratorRuntime.awrap(knex('tokens').del());

                  case 3:
                  case "end":
                    return _context.stop();
                }
              }
            });
          }));

        case 3:
          _context4.next = 5;
          return regeneratorRuntime.awrap(knex.schema.hasTable('users').then(function _callee2(exists) {
            return regeneratorRuntime.async(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    if (!exists) {
                      _context2.next = 3;
                      break;
                    }

                    _context2.next = 3;
                    return regeneratorRuntime.awrap(knex('users').del());

                  case 3:
                  case "end":
                    return _context2.stop();
                }
              }
            });
          }));

        case 5:
          _context4.next = 7;
          return regeneratorRuntime.awrap(knex.schema.hasTable('roles').then(function _callee3(exists) {
            return regeneratorRuntime.async(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    if (!exists) {
                      _context3.next = 3;
                      break;
                    }

                    _context3.next = 3;
                    return regeneratorRuntime.awrap(knex('roles').del());

                  case 3:
                  case "end":
                    return _context3.stop();
                }
              }
            });
          }));

        case 7:
          _context4.next = 9;
          return regeneratorRuntime.awrap(knex('roles').insert([{
            id: 1,
            name: 'waiter',
            hierarchy: 1
          }, {
            id: 2,
            name: 'cashier',
            hierarchy: 2
          }, {
            id: 3,
            name: 'manager',
            hierarchy: 3
          }, {
            id: 4,
            name: 'owner',
            hierarchy: 4
          }]));

        case 9:
          _context4.next = 11;
          return regeneratorRuntime.awrap(bcrypt.hash('password123', 10));

        case 11:
          hashedPassword = _context4.sent;
          _context4.next = 14;
          return regeneratorRuntime.awrap(knex('users').insert([{
            username: 'owner',
            password: hashedPassword,
            email: 'owner@example.com',
            role_id: 4
          }]));

        case 14:
          _context4.next = 16;
          return regeneratorRuntime.awrap(bcrypt.hash('murtaza', 10));

        case 16:
          hashedPassword1 = _context4.sent;
          _context4.next = 19;
          return regeneratorRuntime.awrap(bcrypt.hash('ammar', 10));

        case 19:
          hashedPassword2 = _context4.sent;
          _context4.next = 22;
          return regeneratorRuntime.awrap(User.query(knex).insert([{
            name: 'Admin User',
            email: 'murtaza@example.com',
            password: hashedPassword1,
            // Hashed password
            access_token: 'admintoken'
          }, {
            name: 'Regular User',
            email: 'ammar@example.com',
            password: hashedPassword2,
            // Hashed password
            access_token: 'usertoken'
          }]));

        case 22:
          console.log('Data seeded successfully');
          _context4.next = 28;
          break;

        case 25:
          _context4.prev = 25;
          _context4.t0 = _context4["catch"](0);
          console.error('Error seeding data:', _context4.t0);

        case 28:
          _context4.prev = 28;
          _context4.next = 31;
          return regeneratorRuntime.awrap(knex.destroy());

        case 31:
          return _context4.finish(28);

        case 32:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 25, 28, 32]]);
};