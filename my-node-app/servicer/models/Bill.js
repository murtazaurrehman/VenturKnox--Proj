const { Model } = require('objection');

class Bill extends Model {
  static get tableName() {
    return 'bills';
  }

  static get idColumn() {
    return 'bill_id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['order_id', 'total_amount', 'generated_by'],
      properties: {
        bill_id: { type: 'integer' },
        order_id: { type: 'integer' },
        total_amount: { type: 'number' },
        generated_by: { type: 'integer' },
        generated_at: { type: 'string', format: 'date-time' }
      }
    };
  }
}

module.exports = Bill;
