const { Model } = require('objection');

class Order extends Model {
  static get tableName() {
    return 'orders';
  }

  static get idColumn() {
    return 'order_id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['table_number', 'order_status', 'taken_by'],
      properties: {
        order_id: { type: 'integer' },
        table_number: { type: 'integer' },
        order_status: { type: 'string', minLength: 1, maxLength: 255 },
        taken_by: { type: 'integer' },
        taken_at: { type: 'string', format: 'date-time' }
      }
    };
  }

  static get relationMappings() {
    const OrderItem = require('./OrderItem');
    const Bill = require('./Bill');

    return {
      items: {
        relation: Model.HasManyRelation,
        modelClass: OrderItem,
        join: {
          from: 'orders.order_id',
          to: 'order_items.order_id'
        }
      },
      bill: {
        relation: Model.HasOneRelation,
        modelClass: Bill,
        join: {
          from: 'orders.order_id',
          to: 'bills.order_id'
        }
      }
    };
  }
}

module.exports = Order;
