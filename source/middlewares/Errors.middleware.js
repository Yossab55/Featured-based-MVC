import { notFoundError } from "../error/404.error.js";
import { uploadError } from "../error/fileUpload.error.js";
import { serverError } from "../error/server.error.js";
import { MulterError } from "multer";
function loggingError(error) {
  //todo: You need to manage it to logging system
  console.log("this is the error: ", error);
}

function ErrorHandel(error, req, res, next) {
  loggingError(error);
  //Not Found api doesn't throw error, so error will be undefined
  if (!error) {
    return notFoundError(req.url, res);
  }

  if (error.name.include("APP")) {
    error.endpoint = req.url;
    res.send(error).status(error.code);
  }

  if (error instanceof MulterError) return uploadError(error, req.url, res);

  return serverError(req.url, res);
}

export { ErrorHandel };
