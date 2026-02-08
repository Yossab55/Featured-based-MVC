import { env } from "../utils/helpers.js";

export const mongooseConfig = {
  uri: env("MONGO_URI"),
};
