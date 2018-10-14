// SQL BUILDER
const SQLBuilder = require('json-sql-builder2');
const mysql = require('../helper/mysqlpool');
const config = require('../config/db');


exports.get = function get(table) {
  return new Promise(((resolve) => {
    const sql = new SQLBuilder('MySQL');
    const customersSQL = sql.$select({
      $from: `${config.database}.${table}`,
    });
    console.log(customersSQL);


    mysql.query(
      customersSQL,
      (err, results) => {
        if (err) {
          throw err;
        }
        resolve(results);
      },
    );
  }));
};
