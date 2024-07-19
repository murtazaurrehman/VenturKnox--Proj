exports.up = function(knex) {
    return knex.schema
      // Create Users Table
      .createTable('users', function(table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('password', 255).notNullable();
        table.text('access_token');
        table.string('email', 255);
      })
      // Create Roles Table
      .createTable('roles', function(table) {
        table.increments('id').primary();
        table.string('name', 255).notNullable();
      })
      // Create Role Assignment Table
      .createTable('role_assignment', function(table) {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.integer('role_id').unsigned().notNullable();
        table.foreign('user_id').references('users.id');
        table.foreign('role_id').references('roles.id');
      })
      // Create Permissions Table
      .createTable('permissions', function(table) {
        table.increments('id').primary();
        table.string('name', 255).notNullable();
      })
      // Create Permission Assignment Table
      .createTable('permission_assignment', function(table) {
        table.increments('id').primary();
        table.integer('permission_id').unsigned().notNullable();
        table.integer('role_id').unsigned().notNullable();
        table.foreign('permission_id').references('permissions.id');
        table.foreign('role_id').references('roles.id');
      })
      // Create Methods Table
      .createTable('methods', function(table) {
        table.increments('id').primary();
        table.string('name', 255).notNullable().unique();
      })
      // Create Objects Table
      .createTable('objects', function(table) {
        table.increments('id').primary();
        table.string('name', 255).notNullable();
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('objects')
      .dropTableIfExists('methods')
      .dropTableIfExists('permission_assignment')
      .dropTableIfExists('permissions')
      .dropTableIfExists('role_assignment')
      .dropTableIfExists('roles')
      .dropTableIfExists('users');
  };
  