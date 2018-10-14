const mysql = require('mysql');
const config = require('../config/db');

// MYSQL
module.exports = mysql.createPool({
  connectionLimit: 10,
  ...config,
});
