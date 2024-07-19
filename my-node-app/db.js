// db.js
const knex = require('knex')(require('./knexfile').development);

// Insert a new user
knex('users').insert({ name: 'John Doe', email: 'john.doe@example.com' })
  .then(() => console.log('User inserted'))
  .catch(err => console.error(err))
  .finally(() => knex.destroy());

// Fetch all users
knex('users').select('*')
  .then(users => console.log(users))
  .catch(err => console.error(err))
  .finally(() => knex.destroy());
