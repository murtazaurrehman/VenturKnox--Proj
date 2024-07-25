"use strict";

exports.up = function (knex) {
  return knex.schema.createTable('permissions', function (table) {
    table.increments('permission_id').primary();
    table.string('permission_type', 255).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('permissions');
};