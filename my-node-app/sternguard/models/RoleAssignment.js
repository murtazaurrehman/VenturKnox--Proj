const { Model } = require('objection');

class RoleAssignment extends Model {
  static get tableName() {
    return 'role_assignment';
  }
}

module.exports = RoleAssignment;
