const Permission = require('../models/Permission'); // Adjust the path as necessary

exports.seed = async function(knex) {
  // Clear existing data
  await Permission.query().del();

  // Insert new data
  await Permission.query().insert([
    { id: 1, name: 'View Orders', objects_id: 1, methods_id: 1 },
    { id: 2, name: 'Create Orders', objects_id: 1, methods_id: 2 },
    { id: 3, name: 'Update Orders', objects_id: 1, methods_id: 3 },
    { id: 4, name: 'Delete Orders', objects_id: 1, methods_id: 4 },
    { id: 5, name: 'View Users', objects_id: 2, methods_id: 1 },
    { id: 6, name: 'Create Users', objects_id: 2, methods_id: 2 },
    { id: 7, name: 'Update Users', objects_id: 2, methods_id: 3 },
    { id: 8, name: 'Delete Users', objects_id: 2, methods_id: 4 },
    { id: 9, name: 'View Menu', objects_id: 3, methods_id: 1 },
    // Add more permissions as needed
  ]);
};