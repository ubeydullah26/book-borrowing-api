import { Knex } from "knex";

const config: Knex.Config = {
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
  },
  migrations: {
    directory: "./src/database/migrations",
  },
  seeds: {
    directory: "./src/database/seeds",
  },
  debug: true,
};

export default config;
