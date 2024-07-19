const Knex = require('knex');
const knexConfig = require('./knexfile');
const User = require('./models/User');

const knex = Knex(knexConfig.development);

// Bind all Models to the knex instance
User.knex(knex);

async function seed() {
  try {
    await knex('users').del(); // Delete existing entries

    await User.query().insert([
      {
        name: 'Admin User',
        email: 'murtaza@example.com',
        password: 'murtaza', // Ideally, you should hash the password
        access_token: 'admintoken'
      },
      {
        name: 'Regular User',
        email: 'ammar@example.com',
        password: 'ammar',
        access_token: 'usertoken'
      }
    ]);

    console.log('Data seeded successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    knex.destroy();
  }
}

seed();
