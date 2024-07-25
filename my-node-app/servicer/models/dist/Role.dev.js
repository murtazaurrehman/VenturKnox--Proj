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

var Role =
/*#__PURE__*/
function (_Model) {
  _inherits(Role, _Model);

  function Role() {
    _classCallCheck(this, Role);

    return _possibleConstructorReturn(this, _getPrototypeOf(Role).apply(this, arguments));
  }

  _createClass(Role, null, [{
    key: "tableName",
    get: function get() {
      return 'roles';
    }
  }, {
    key: "idColumn",
    get: function get() {
      return 'role_id';
    }
  }, {
    key: "jsonSchema",
    get: function get() {
      return {
        type: 'object',
        required: ['role_name'],
        properties: {
          role_id: {
            type: 'integer'
          },
          role_name: {
            type: 'string',
            minLength: 1,
            maxLength: 255
          }
        }
      };
    }
  }, {
    key: "relationMappings",
    get: function get() {
      var User = require('./User');

      var PermissionRole = require('./PermissionRole');

      return {
        users: {
          relation: Model.HasManyRelation,
          modelClass: User,
          join: {
            from: 'roles.role_id',
            to: 'users.role_id'
          }
        },
        permissions: {
          relation: Model.ManyToManyRelation,
          modelClass: require('./Permission'),
          join: {
            from: 'roles.role_id',
            through: {
              from: 'permission_role.role_id',
              to: 'permission_role.permission_id'
            },
            to: 'permissions.permission_id'
          }
        }
      };
    }
  }]);

  return Role;
}(Model);

module.exports = Role;