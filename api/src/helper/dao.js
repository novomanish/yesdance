// SQL BUILDER
const SQLBuilder = require('json-sql-builder2');
const mysql = require('../helper/mysqlpool');
const config = require('../config/db');
const sqlBuilder = new SQLBuilder('MySQL');

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
  const sqlQuery = sqlBuilder.$select({
    $from: `${config.database}.${table}`,
  });
  console.log(sqlQuery);

  return query(sqlQuery);
};

function put(table, data) {
  const sqlQuery = sqlBuilder.$insert({
    $table: 'purchase',
    $columns: (() => {
      const o = {};
      Object.keys(data).forEach(k => {
        o[k] = true;
      });
      return o;
    })(),
    $values: Object.keys(data).map(k => data[k])
  });
  return query(sqlQuery.sql, sqlQuery.values);
}

exports.query = query;
exports.get = get;
exports.put = put;

