"use strict";

exports.up = function (knex) {
  return knex.schema.createTable('orders', function (table) {
    table.increments('order_id').primary();
    table.integer('table_number').notNullable();
    table.string('order_status', 255).notNullable();
    table.integer('taken_by').unsigned().references('user_id').inTable('users');
    table.timestamp('taken_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('orders');
};