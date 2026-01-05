import { ValidationError } from "../source/error/ValidationError.js";
import { MySQLError } from "../source/error/DatabaseErrorIndex.js";
import { AppError } from "../source/error/AppError.js";
import { JWTError } from "../source/error/JWTError.js";
import { serverError } from "../source/error/ServerError.js";
import { NOT_FOUND, UNAUTHORIZED } from "../utils/constants/ResponseCode.js";

function ErrorHandel(error, req, res, next) {
  console.log("error: ", error);
  //Url is wrong
  if (!error) {
    return AppError("404, page not found", NOT_FOUND).sendResponse(res);
  }
  const errorType = error.name;
  if (errorType == "ValidationError") return ValidationError(error, res);

  if (errorType == "AppError") return error.sendResponse(res);

  if (errorType == "JsonWebTokenError")
    return JWTError("User is not Authenticated", UNAUTHORIZED).sendResponse(
      res
    );

  //it's MySQLError
  if (Object.hasOwn(error, "errno") && Object.hasOwn(error, "sqlState"))
    return MySQLError(error, res);

  return serverError(res);
}

export { ErrorHandel };
