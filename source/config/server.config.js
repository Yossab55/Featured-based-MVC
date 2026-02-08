import { env } from "../utils/helpers.js";

const serverConfig = {
  port: env("SERVER_PORT"),
  host: env("SERVER_HOST"),
};

export { serverConfig };
