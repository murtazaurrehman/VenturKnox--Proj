const { Model } = require('objection');

class Role extends Model {
  static get tableName() {
    return 'roles';
  }

  static get relationMappings() {
    const User = require('./User');
    const Permission = require('./Permission');
    const RoleAssignment = require('./RoleAssignment');
    const PermissionAssignment = require('./PermissionAssignment');

    return {
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'roles.id',
          through: {
            from: 'role_assignment.role_id',
            to: 'role_assignment.user_id'
          },
          to: 'users.id'
        }
      },
      permissions: {
        relation: Model.ManyToManyRelation,
        modelClass: Permission,
        join: {
          from: 'roles.id',
          through: {
            from: 'permission_assignment.role_id',
            to: 'permission_assignment.permission_id'
          },
          to: 'permissions.id'
        }
      }
    };
  }
}

module.exports = Role;
