"use strict";

exports.seed = function (knex) {
  return knex('objects').insert([{
    id: 1,
    name: 'Orders'
  }, {
    id: 2,
    name: 'Users'
  }, {
    id: 3,
    name: 'Menu'
  }, {
    id: 4,
    name: 'Bill'
  } // Add more objects as needed
  ]);
};