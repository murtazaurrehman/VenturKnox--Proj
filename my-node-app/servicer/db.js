const { Model } = require('objection');
const Knex = require('knex');
const knexConfig = require('./knexfile');

// Function to initialize Objection with Knex
function initializeObjection() {
    const knex = Knex(knexConfig.development);
    Model.knex(knex);
    return knex;
}

module.exports = initializeObjection;