"use strict";

// knexfile.js
module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'postgres2',
      user: 'postgres2',
      password: 'anothersecretpassword',
      database: 'servicer',
      port: 5432 // Port inside the Docker network

    },
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  }
};