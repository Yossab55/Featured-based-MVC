//In the name of Cross ✞

import { baseError } from "./base.error.js";
import { BAD_REQUEST } from "../utils/constants/ResponseCode.js";
function uploadError(err, url, res) {
  const error = baseError(
    err.name,
    BAD_REQUEST,
    `${err.message}: something went wrong with the file upload`,
    "I can't send the file (it's to big) but it's with the file",
    "please check the type of the value or try again later",
    url,
    err.stack,
  );
  return res.send(error).status(BAD_REQUEST);
}

export { uploadError };
