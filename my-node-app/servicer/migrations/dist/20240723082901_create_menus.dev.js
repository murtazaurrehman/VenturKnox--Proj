"use strict";

exports.up = function (knex) {
  return knex.schema.createTable('menus', function (table) {
    table.increments('item_id').primary();
    table.string('item_name', 255).notNullable();
    table["float"]('price').notNullable();
    table.text('description');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('menus');
};