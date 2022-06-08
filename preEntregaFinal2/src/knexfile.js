// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: '../src/db/sqlite3/ecommerce.db3'
    },
    useNullAsDefault: true,
  },

};
