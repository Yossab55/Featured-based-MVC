import { baseError } from "../../error/base.error.js";
import { BAD_REQUEST } from "../../utils/constants/ResponseCode.js";

function SQLCreateError(sqlError, endpoint, stack) {
  const error = baseError(
    "SQL Error from APP",
    BAD_REQUEST,
    sqlError.sqlMessage,
    sqlError.sql,
    "Please chick MySQL manual and fix the Query.",
    endpoint,
    sqlError.stack,
  );

  return error;
}

export { SQLCreateError };
