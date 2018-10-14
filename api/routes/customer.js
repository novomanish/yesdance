const express = require('express');
const router = express.Router();

// MYSQL
const mysql = require('mysql');
const host = 'localhost';
const database = 'main';
const user = 'root';
const password = 'welcome$$123';
const pool  = mysql.createPool({
  connectionLimit : 10,
  host,
  user,
  password,
  database
});

// SQL BUILDER
const SQLBuilder = require('json-sql-builder2');


/* GET users listing. */
router.get('/', function(req, res, next) {
  const sql = new SQLBuilder('MySQL');
  const customersSQL = sql.$select({
    id: true,
    fname:true,
    lname: true,
    email: true,
    phone: true,
    $from: `${database}.person`
  });
  console.log(customersSQL);


  pool.query(
    customersSQL,
    function selectCb(err, results, fields) {
      if (err) {
        throw err;
      }
      res.send(results);
    }
  );
});

module.exports = router;
