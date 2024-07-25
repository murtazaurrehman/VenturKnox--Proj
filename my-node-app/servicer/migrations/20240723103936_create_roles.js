// migrations/YYYYMMDDHHMMSS_create_roles.js
exports.up = function(knex) {
    return knex.schema.createTable('roles', table => {
      table.increments('role_id').primary();
      table.string('role_name').notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('roles');
  };
  