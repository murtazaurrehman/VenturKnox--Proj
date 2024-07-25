const { Model } = require('objection');

class Menu extends Model {
  static get tableName() {
    return 'menu';
  }

  static get idColumn() {
    return 'item_id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['item_name', 'price'],
      properties: {
        item_id: { type: 'integer' },
        item_name: { type: 'string', minLength: 1, maxLength: 255 },
        price: { type: 'number' },
        description: { type: 'string' }
      }
    };
  }
}

module.exports = Menu;
