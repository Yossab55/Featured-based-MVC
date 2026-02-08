// In the name of Cross ✞
import { mongoCreateError } from "../databases/mongo/mongoCreateError.js";
import { joiCreateError } from "../interface/joi/joiCreateError.js";
import { SQLCreateError } from "../databases/knex/SQLCreateError.js";
import { baseError } from "./base.error.js";
import {
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
} from "../utils/constants/ResponseCode.js";
import { getStack } from "../utils/helpers.js";
const appError = {
  joi: joiCreateError,
  mongo: mongoCreateError,
  sql: SQLCreateError,
  env: function createEnvError(value, endpoint, stack) {
    return baseError(
      "Env Config Error, from APP",
      INTERNAL_SERVER_ERROR,
      "Env variable config is not loaded right",
      value,
      "Check the Code base again & the value",
      endpoint,
      stack,
    );
  },
  unauthorized: function unauthorized(value, endpoint, stack) {
    return baseError(
      "App Error, user is unauthorized",
      UNAUTHORIZED,
      "client used an endpoint and he is not authorized",
      value,
      "Please sign or login in our system",
      endpoint,
      stack,
    );
  },
  custom: function createCustomError(message, value, endpoint, stack) {
    return baseError(
      `APP Error, programmer code bug, with message: ${message}`,
      INTERNAL_SERVER_ERROR,
      "Something went wrong the code base",
      value,
      "Please, check the stack & the Code right now",
      endpoint,
      stack,
    );
  },
};
export { appError };

//In JWT there is no error: you specific the error
// if you got an error it's almost a bug from you 🫵
