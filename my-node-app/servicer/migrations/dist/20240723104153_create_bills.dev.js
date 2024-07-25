"use strict";

// migrations/YYYYMMDDHHMMSS_create_bills.js
exports.up = function (knex) {
  return knex.schema.createTable('bills', function (table) {
    table.increments('bill_id').primary();
    table.integer('order_id').unsigned().references('order_id').inTable('orders').onDelete('CASCADE');
    table.decimal('total_amount').notNullable();
    table.integer('generated_by').unsigned().references('user_id').inTable('users').onDelete('SET NULL');
    table.timestamp('generated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('bills');
};