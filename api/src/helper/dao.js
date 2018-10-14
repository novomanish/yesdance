// SQL BUILDER
const SQLBuilder = require('json-sql-builder2');
const mysql = require('../helper/mysqlpool');
const config = require('../config/db');


exports.get = function get(table) {
  return new Promise(((resolve) => {
    const sqlBuilder = new SQLBuilder('MySQL');
    const sqlQuery = sqlBuilder.$select({
      $from: `${config.database}.${table}`,
    });
    console.log(sqlQuery);


    mysql.query(
      sqlQuery,
      (err, results) => {
        if (err) {
          throw err;
        }
        resolve(results);
      },
    );
  }));
};

exports.query = function get(sqlQuery) {
  return new Promise(((resolve) => {
    mysql.query(
      sqlQuery,
      (err, results) => {
        if (err) {
          throw err;
        }
        resolve(results);
      },
    );
  }));
};
