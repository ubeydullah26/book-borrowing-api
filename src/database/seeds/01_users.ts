import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    { name: "Eray Aslan" },
    { name: "Enes Faruk Meniz" },
    { name: "Sefa Eren Şahin" },
    { name: "Kadir Mutlu" },
  ]);
}
