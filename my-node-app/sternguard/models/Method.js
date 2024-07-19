const { Model } = require('objection');

class Permission extends Model {
  static get tableName() {
    return 'permissions';
  }

  static get relationMappings() {
    const Role = require('./Role');
    const PermissionAssignment = require('./PermissionAssignment');

    return {
      roles: {
        relation: Model.ManyToManyRelation,
        modelClass: Role,
        join: {
          from: 'permissions.id',
          through: {
            from: 'permission_assignment.permission_id',
            to: 'permission_assignment.role_id'
          },
          to: 'roles.id'
        }
      }
    };
  }
}

module.exports = Permission;
