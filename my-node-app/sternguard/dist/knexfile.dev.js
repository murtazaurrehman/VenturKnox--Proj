"use strict";

// knexfile.js
module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'postgres',
      user: 'postgres',
      password: 'mysecretpassword',
      database: 'restaraunt',
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