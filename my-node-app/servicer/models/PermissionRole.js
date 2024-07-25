const { Model } = require('objection');

class PermissionRole extends Model {
  static get tableName() {
    return 'permission_role';
  }

  static get idColumn() {
    return ['permission_id', 'role_id'];
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['permission_id', 'role_id'],
      properties: {
        permission_id: { type: 'integer' },
        role_id: { type: 'integer' }
      }
    };
  }
}

module.exports = PermissionRole;
