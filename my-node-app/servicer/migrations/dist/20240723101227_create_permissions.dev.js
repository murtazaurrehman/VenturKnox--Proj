"use strict";

// migrations/YYYYMMDDHHMMSS_create_permissions.js
exports.up = function (knex) {
  return knex.schema.createTable('permissions', function (table) {
    table.increments('permission_id').primary();
    table.string('permission_type').notNullable();
    table.string('permission_name').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('permissions');
};