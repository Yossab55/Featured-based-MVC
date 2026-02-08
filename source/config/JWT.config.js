import { env } from "../utils/helpers.js";

export const jwtConfig = {
  secret: env("JWT_SECRET"),
  expire: env("JWT_EXPIRES"),
};
