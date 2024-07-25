"use strict";

exports.up = function (knex) {
  return knex.schema.createTable('bills', function (table) {
    table.increments('bill_id').primary();
    table.integer('order_id').unsigned().references('order_id').inTable('orders');
    table["float"]('total_amount').notNullable();
    table.integer('generated_by').unsigned().references('user_id').inTable('users');
    table.timestamp('generated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('bills');
};