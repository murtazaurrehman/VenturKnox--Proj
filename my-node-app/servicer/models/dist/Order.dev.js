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

var _require = require('objection'),
    Model = _require.Model;

var Order =
/*#__PURE__*/
function (_Model) {
  _inherits(Order, _Model);

  function Order() {
    _classCallCheck(this, Order);

    return _possibleConstructorReturn(this, _getPrototypeOf(Order).apply(this, arguments));
  }

  _createClass(Order, null, [{
    key: "tableName",
    get: function get() {
      return 'orders';
    }
  }, {
    key: "idColumn",
    get: function get() {
      return 'order_id';
    }
  }, {
    key: "jsonSchema",
    get: function get() {
      return {
        type: 'object',
        required: ['table_number', 'order_status', 'taken_by'],
        properties: {
          order_id: {
            type: 'integer'
          },
          table_number: {
            type: 'integer'
          },
          order_status: {
            type: 'string',
            minLength: 1,
            maxLength: 255
          },
          taken_by: {
            type: 'integer'
          },
          taken_at: {
            type: 'string',
            format: 'date-time'
          }
        }
      };
    }
  }, {
    key: "relationMappings",
    get: function get() {
      var OrderItem = require('./OrderItem');

      var Bill = require('./Bill');

      return {
        items: {
          relation: Model.HasManyRelation,
          modelClass: OrderItem,
          join: {
            from: 'orders.order_id',
            to: 'order_items.order_id'
          }
        },
        bill: {
          relation: Model.HasOneRelation,
          modelClass: Bill,
          join: {
            from: 'orders.order_id',
            to: 'bills.order_id'
          }
        }
      };
    }
  }]);

  return Order;
}(Model);

module.exports = Order;