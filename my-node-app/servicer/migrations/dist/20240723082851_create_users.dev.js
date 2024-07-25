"use strict";

exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments('user_id').primary();
    table.string('username', 255).notNullable();
    table.string('password', 255).notNullable();
    table.integer('role_id').unsigned().references('role_id').inTable('roles');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};