"use strict";

exports.up = function (knex) {
  return knex.schema.createTable('permission_role', function (table) {
    table.integer('permission_id').unsigned().references('permission_id').inTable('permissions');
    table.integer('role_id').unsigned().references('role_id').inTable('roles');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('permission_role');
};