/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTableIfNotExists("products", (tbl) => {
      tbl.increments("idProduct").primary();
      tbl.text("title", 128).notNullable();
      tbl.text("price", 128).notNullable();
      tbl.text("thumbail", 1024).notNullable();
      tbl.timestamps(true, true);
    })
    .createTableIfNotExists("cart", (tbl) => {
      tbl.increments("idCart").primary();
      tbl.timestamps(true, true);
    })
    .createTableIfNotExists("cartProduct", (tbl) => {
      tbl.increments("id").primary();
      tbl.text("title", 128).notNullable();
      tbl.text("price", 128).notNullable();
      tbl.text("thumbail", 1024).notNullable();

      tbl
        .integer("idCart")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("cart")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("products")
    .dropTableIfExists("cart")
    .dropTableIfExists("cartProducts");
};
