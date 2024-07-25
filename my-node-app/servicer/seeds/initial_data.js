exports.seed = async function(knex) {
  await knex('permission_role').del();
  await knex('permissions').del();
  await knex('roles').del();
  await knex('users').del();
  await knex('menu').del();
  await knex('orders').del();
  await knex('order_items').del();
  await knex('bills').del();

  // Insert roles
  await knex('roles').insert([
    { role_name: 'Admin' },
    { role_name: 'User' },
  ]);

  // Insert permissions
  await knex('permissions').insert([
    { permission_type: 'read', permission_name: 'Read Data' },
    { permission_type: 'write', permission_name: 'Write Data' },
  ]);

  // Insert permission_role
  await knex('permission_role').insert([
    { role_id: 1, permission_id: 1 },
    { role_id: 1, permission_id: 2 },
    { role_id: 2, permission_id: 1 },
  ]);

  // Insert users
  await knex('users').insert([
    { username: 'admin', password: 'password123', role_id: 1 },
    { username: 'user', password: 'password123', role_id: 2 },
  ]);

  // Insert menus
  await knex('menu').insert([
    { item_name: 'Pizza', price: 12.99, description: 'Delicious cheese pizza' },
    { item_name: 'Burger', price: 9.99, description: 'Juicy beef burger' },
  ]);

  // Insert orders
  await knex('orders').insert([
    { table_number: 1, order_status: 'pending', taken_by: 2 },
  ]);

  // Insert order_items
  await knex('order_items').insert([
    { order_id: 1, item_id: 1, quantity: 2, price: 12.99 },
  ]);

  // Insert bills
  await knex('bills').insert([
    { order_id: 1, total_amount: 25.98, generated_by: 2 },
  ]);
};
