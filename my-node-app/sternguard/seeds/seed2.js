const bcrypt = require('bcryptjs');
const { Model } = require('objection');
const knexConfig = require('../knexfile'); // Adjust the path if necessary
const knex = require('knex')(knexConfig.development); // Use the appropriate environment

// Bind all Models to the knex instance
Model.knex(knex);

// Define your User model (if not defined elsewhere)
class User extends Model {
  static get tableName() {
    return 'users';
  }
}

// Export the seed function
exports.seed = async function(knex) {
  try {
    // Delete from tables only if they exist
    if (await knex.schema.hasTable('tokens')) {
      await knex('tokens').del();
    }

    if (await knex.schema.hasTable('users')) {
      await knex('users').del();
    }

    // Insert sample users with hashed passwords
    const hashedPassword1 = await bcrypt.hash('password123', 10);
    const hashedPassword2 = await bcrypt.hash('murtaza', 10);
    const hashedPassword3 = await bcrypt.hash('ammar', 10);

    await knex('users').insert([
      {
        name: 'Owner',
        password: hashedPassword1,
        email: 'owner@example.com'
      },
      {
        name: 'Admin User',
        password: hashedPassword2,
        email: 'murtaza@example.com',
        access_token: 'admintoken'
      },
      {
        name: 'Regular User',
        password: hashedPassword3,
        email: 'ammar@example.com',
        access_token: 'usertoken'
      }
    ]);

    console.log('Data seeded successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await knex.destroy();
  }
};
