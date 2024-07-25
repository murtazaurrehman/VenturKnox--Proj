"use strict";

exports.up = function (knex) {
  return knex.schema.createTable('order_items', function (table) {
    table.integer('order_id').unsigned().references('order_id').inTable('orders');
    table.integer('item_id').unsigned().references('item_id').inTable('menus');
    table.integer('quantity').notNullable();
    table["float"]('price').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('order_items');
};