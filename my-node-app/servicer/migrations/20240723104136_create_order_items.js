// migrations/YYYYMMDDHHMMSS_create_order_items.js
exports.up = function(knex) {
    return knex.schema.createTable('order_items', table => {
      table.increments('item_id').primary();
      table.integer('order_id').unsigned().references('order_id').inTable('orders').onDelete('CASCADE');
      table.integer('menu_id').unsigned().references('item_id').inTable('menu').onDelete('CASCADE');
      table.integer('quantity').notNullable();
      table.decimal('price').notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('order_items');
  };
  