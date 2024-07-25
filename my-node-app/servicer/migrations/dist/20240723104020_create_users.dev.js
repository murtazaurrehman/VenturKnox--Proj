"use strict";

// migrations/YYYYMMDDHHMMSS_create_users.js
exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments('user_id').primary();
    table.string('username').notNullable();
    table.string('password').notNullable();
    table.integer('role_id').unsigned().references('role_id').inTable('roles').onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};