const { Model } = require('objection');

class Role extends Model {
  static get tableName() {
    return 'roles';
  }

  static get idColumn() {
    return 'role_id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['role_name'],
      properties: {
        role_id: { type: 'integer' },
        role_name: { type: 'string', minLength: 1, maxLength: 255 }
      }
    };
  }

  static get relationMappings() {
    const User = require('./User');
    const PermissionRole = require('./PermissionRole');

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
}

module.exports = Role;
