import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("books").del();

  // Inserts seed entries
  await knex("books").insert([
    { name: "The Hitchhiker's Guide to the Galaxy" },
    { name: "I, Robot" },
    { name: "Dune" },
    { name: "1984" },
    { name: "Brave New World" },
  ]);
}
