exports.up = function(knex) {
    return knex.schema.alterTable('permissions', function(table) {
        table.integer('objects_id').unsigned().notNullable();
        table.integer('methods_id').unsigned().notNullable();

        table.foreign('objects_id').references('objects.id');
        table.foreign('methods_id').references('methods.id');
    });
};

exports.down = function(knex) {
    return knex.schema.alterTable('permissions', function(table) {
        table.dropForeign('objects_id');
        table.dropForeign('methods_id');

        table.dropColumn('objects_id');
        table.dropColumn('methods_id');
    });
};