'use strict';

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/users_dev'
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/users_test'
  }
};
