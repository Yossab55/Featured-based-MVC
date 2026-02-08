import { appError } from "../error/app.error.js";

function env(field) {
  const value = process.env[field];
  if (value == undefined) throw appError.env(field, "http://test", getStack());
  return value;
}

export { env };

function getStack() {
  const obj = {};
  Error.captureStackTrace(obj, getStack); // The second argument removes 'getStack' from the trace
  return obj.stack;
}

export { getStack };
