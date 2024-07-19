const { Model } = require('objection');

class ObjectModel extends Model { // Use ObjectModel to avoid conflicts with JS reserved word
  static get tableName() {
    return 'objects';
  }
}

module.exports = ObjectModel;
