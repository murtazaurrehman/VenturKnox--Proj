"use strict";

// migrations/YYYYMMDDHHMMSS_create_permission_role.js
exports.up = function (knex) {
  return knex.schema.createTable('permission_role', function (table) {
    table.increments('id').primary();
    table.integer('permission_id').unsigned().references('permission_id').inTable('permissions').onDelete('CASCADE');
    table.integer('role_id').unsigned().references('role_id').inTable('roles').onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('permission_role');
};