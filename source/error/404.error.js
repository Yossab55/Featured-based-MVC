import { baseError } from "./base.error.js";
import { NOT_FOUND } from "../utils/constants/ResponseCode.js";
import { getStack } from "../utils/helpers.js";

function notFoundError(url, res) {
  const error = baseError(
    "Not Found",
    NOT_FOUND,
    "This URL is wrong, this page doesn't exists",
    url,
    "Redirect to Home page || or go to right pages",
    url,
    getStack(),
  );
  return res.send(error).status(NOT_FOUND);
}

export { notFoundError };
