import { BaseError } from "./BaseError.js";
import { INTERNAL_SERVER_ERROR } from "../../utils/constants/ResponseCode.js";

function serverError(res) {
  const serverError = Object.create(BaseError);
  const message = "500 server down, please try later";
  const name = "server down";
  serverError.init(message, name, INTERNAL_SERVER_ERROR);
  return serverError.sendResponse(res);
}

export { serverError };
