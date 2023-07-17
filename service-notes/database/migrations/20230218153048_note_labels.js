/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("note_labels", t =>{
    t.increments("id");
    t.string("note_id").notNullable();
    t.foreign("note_id").references("id").inTable("notes").onDelete("CASCADE");
    t.string("label_id").notNullable();
    t.foreign("label_id").references("id").inTable("labels").onDelete("CASCADE");
    t.timestamps(true,true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("note_labels");
};
