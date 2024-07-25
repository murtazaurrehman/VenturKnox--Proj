const { Model } = require('objection');

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get idColumn() {
    return 'user_id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['username', 'password', 'role_id'],
      properties: {
        user_id: { type: 'integer' },
        username: { type: 'string', minLength: 1, maxLength: 255 },
        password: { type: 'string', minLength: 1, maxLength: 255 },
        role_id: { type: 'integer' }
      }
    };
  }

  static get relationMappings() {
    const Role = require('./Role');

    return {
      role: {
        relation: Model.BelongsToOneRelation,
        modelClass: Role,
        join: {
          from: 'users.role_id',
          to: 'roles.role_id'
        }
      }
    };
  }
}

module.exports = User;
