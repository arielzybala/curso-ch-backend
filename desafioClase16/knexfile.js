// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "../desafioClase16/src/public/db/data/ecommerce.db3",
    },
    useNullAsDefault: true,
  },
};
