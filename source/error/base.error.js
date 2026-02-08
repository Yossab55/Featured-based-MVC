//here description is the message in Error()
//description gives you the sense or writing more 🤣

/**
 *
 * @param {String} name
 * @param {Number} code
 * @param {String} description
 * @param {String} endpoint
 * @param {String} wayToSolve
 * @param {String} callstack
 * @returns {Object}
 */
function baseError(
  name,
  code,
  description,
  value,
  wayToSolve,
  endpoint,
  callstack,
) {
  const error = {
    name,
    code,
    description,
    value,
    wayToSolve,
    endpoint,
    callstack,
  };
  return error;
}
export { baseError };
