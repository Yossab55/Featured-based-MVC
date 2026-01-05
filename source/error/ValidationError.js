import { BaseError } from "./BaseError.js";

function ValidationError(error, res) {
  const validationError = Object.create(BaseError);
  const name = error.name;
  const message = [
    ...error.details.map((errorDetails) => errorDetails.message),
  ];
  validationError.init(message, name);
  return validationError.sendResponse(res);
}

export { ValidationError };
