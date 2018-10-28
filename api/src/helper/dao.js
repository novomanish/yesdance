// SQL BUILDER
const SQLBuilder = require('json-sql-builder2');
const mysql = require('../helper/mysqlpool');
const config = require('../config/db');

function query(sqlQuery, values) {
  console.log(sqlQuery, values);
  return new Promise(((resolve) => {
    mysql.query(
      sqlQuery,
      values,
      (err, results) => {
        if (err) {
          throw err;
        }
        resolve(results);
      },
    );
  }));
};
function get(table) {
  const sqlBuilder = new SQLBuilder('MySQL');
  const sqlQuery = sqlBuilder.$select({
    $from: `${config.database}.${table}`,
  });
  console.log(sqlQuery);

  return query(sqlQuery);
};

exports.query = query;
exports.get = get;


