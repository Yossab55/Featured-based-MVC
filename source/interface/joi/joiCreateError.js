import { baseError } from "../../error/base.error.js";
import { BAD_REQUEST } from "../../utils/constants/ResponseCode.js";

function joiCreateError(joiError, endpoint, stack) {
  const errors = [];
  for (const detail of joiError.details) {
    const error = baseError(
      "Validation Error from APP",
      BAD_REQUEST,
      detail.message,
      detail.context.value,
      "Please Insert correct Data",
      endpoint,
      stack,
    );

    errors.push(error);
  }
  return errors;
}

export { joiCreateError };

/** joi throws or returns ValidationError objects containing :

  name - 'ValidationError'.
  isJoi - true.
  details - an array of errors :
    message - string with a description of the error.
    path - ordered array where each element is the accessor to the value where the error happened.
    type - type of the error.
    context - object providing context of the error containing:
      key - key of the value that erred, equivalent to the last element of details.path.
      label - label of the value that erred, or the key if any, or the default messages.root.
      value - the value that failed validation.
      other error specific properties as described for each error code.
array of Objects!!
[
  {
    "message": "\"email\" must be a valid email",
    "path": ["email"],
    "type": "string.email",
    "context": {
      "label": "email",
      "value": "not-an-email"
    }
  }
]

 */
