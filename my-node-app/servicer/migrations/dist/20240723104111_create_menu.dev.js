"use strict";

// migrations/YYYYMMDDHHMMSS_create_menu.js
exports.up = function (knex) {
  return knex.schema.createTable('menu', function (table) {
    table.increments('item_id').primary();
    table.string('item_name').notNullable();
    table.decimal('price').notNullable();
    table.string('description').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('menu');
};