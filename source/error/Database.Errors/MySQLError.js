import { BaseError } from "../BaseError.js";

function MySQLError(error, res) {
  const error = Object.create(BaseError);
  const errorName = "Wrong query with DB";
  const errorMessage = error.sqlMessage;
  error.init(errorMessage, errorName);
  return error.sendResponse(res);
}

export { MySQLError };
