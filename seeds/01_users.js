'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          firstname: 'Bob',
          lastname: 'Ross',
          username: 'paint4life',
          email: 'bob@ross.com',
          phone: '303-333-3333'
        },
        {
          id: 2,
          firstname: 'Leo',
          lastname: 'Davinci',
          username: 'prettyp@ints',
          email: 'leo@davinci.com',
          phone: '720-777-7777'
        }
      ]);
    })
    .then(() => {
  return knex.raw(
    "SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));"
  );
});
};
