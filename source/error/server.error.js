import { baseError } from "./base.error.js";
import { INTERNAL_SERVER_ERROR } from "../utils/constants/ResponseCode.js";
import { getStack } from "../utils/helpers.js";

function serverError(url, res) {
  const error = baseError(
    "Server Error",
    INTERNAL_SERVER_ERROR,
    "Something went Wrong with the server",
    url,
    "Please wait & restart the App or try again",
    getStack(),
  );
  return res.send(error).status(INTERNAL_SERVER_ERROR);
}

export { serverError };
