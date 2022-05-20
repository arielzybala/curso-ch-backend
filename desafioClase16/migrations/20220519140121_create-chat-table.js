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
      tbl.timestamps(true, true);
    })
    .createTable("messages", (tbl) => {
      tbl.increments();
      tbl.text("message").notNullable();
      tbl.timestamps(true, true);
      //CONECTA A LA TABLA DE REFERENCIA (USUARIOS)
      tbl
        .integer("users_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("messages").dropTableIfExists("users");
};
