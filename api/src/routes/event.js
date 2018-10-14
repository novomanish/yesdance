const router = require('express').Router();
const dao = require('../helper/dao');
const config = require('../config/db');


router.get('/', (req, res) => {
  dao.query(`
    SELECT p.name, e.id, e.type, e.startdate, e.enddate, p.id eventid 
    FROM ${config.database}.event as e 
    LEFT JOIN ${config.database}.product p ON p.id = e.type
    WHERE e.enddate > NOW()
    ORDER BY e.enddate ASC;`).then((results) => {
    res.send(results);
  });
});

module.exports = router;
