import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("borrows").del();

  // Inserts seed entries
  await knex("borrows").insert([
    { user_id: 2, book_id: 1, score: 10, is_returned: true },
    { user_id: 2, book_id: 2, score: 5, is_returned: true },
    { user_id: 2, book_id: 5, is_returned: false },
  ]);
}
