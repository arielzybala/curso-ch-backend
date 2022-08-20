/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTableIfNotExists("users", (tbl) => {
      tbl.increments();
      tbl.text("name", 128).notNullable();
      tbl.text("email", 128).notNullable();
      tbl.text("message").notNullable();
      tbl.timestamps(true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
