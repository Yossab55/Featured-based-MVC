import { env } from "../utils/helpers.js";

export const knexConfig = {
  client: env("KNEX_CLIENT"),
  connection: {
    host: env("SQL_HOST"),
    port: env("SQL_PORT"),
    user: env("SQL_USER"),
    password: env("SQL_PASSWORD"),
    database: env("SQL_DATABASE"),
  },
};
