const { Model } = require('objection');

class OrderItem extends Model {
  static get tableName() {
    return 'order_items';
  }

  static get idColumn() {
    return ['item_id', 'order_id'];
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['item_id', 'order_id', 'quantity', 'price'],
      properties: {
        item_id: { type: 'integer' },
        order_id: { type: 'integer' },
        quantity: { type: 'integer' },
        price: { type: 'number' }
      }
    };
  }
}

module.exports = OrderItem;
