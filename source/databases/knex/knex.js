import knex from "knex";
import { knexConfig } from "../../config/knex.config.js";
import { appError } from "../../error/app.error.js";
// import { getStack } from "../../utils/helpers.js";
const MySQL = knex(knexConfig);

MySQL.on("query-error", (error, obj) => {
  // you can't throw an error form event!!
  //Todo you need to know how to stop this
  const err = appError.sql(error, "http://test");
  console.log(err);
  throw err;
});

export { MySQL };
//In Knex
/**
 *   .select(['NonExistentColumn'])
  .from('users')
  ***** .on('query-error', function (error, obj) {
    app.log(error);
  })
    and you can make it global :
    knex.on('query-error', (error, obj) => {
    console.error('Global query error:', error);
});
the error message from the database driver

SQL state / code

stack trace

potentially the compiled SQL query (depending on config)
— because Knex by default includes SQL text in errors unless you turn that off (compileSqlOnError: false).

The obj parameter is an object describing the query that failed.
It’s basically the same data you’d see in the query event, plus some Knex internals such as:

Typical fields in obj
Field	Meaning
sql	The SQL string Knex compiled for the query
bindings	The bound parameter values Knex would insert into placeholders
 */
