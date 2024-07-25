const { Model } = require('objection');

class Permission extends Model {
  static get tableName() {
    return 'permissions';
  }

  static get idColumn() {
    return 'permission_id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['permission_type', 'permission_name'],
      properties: {
        permission_id: { type: 'integer' },
        permission_type: { type: 'string', minLength: 1, maxLength: 255 },
        permission_name: { type: 'string', minLength: 1, maxLength: 255 }
      }
    };
  }
}

module.exports = Permission;
