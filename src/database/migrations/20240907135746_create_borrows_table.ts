import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("borrows", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().references("id").inTable("users");
    table.integer("book_id").unsigned().references("id").inTable("books");
    table.integer("score").nullable();
    table.boolean("is_returned").defaultTo(false);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("borrows");
}
