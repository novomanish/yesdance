const router = require('express').Router();
const dao = require('../helper/dao');
const config = require('../config/db');


router.get('/', (req, res) => {
  dao.query(`select e.id, e.type, e.startdate, e.enddate, p.name, p.id eventid from ${config.database}.event as e left join ${config.database}.product p on p.id = e.type;`).then((results) => {
    res.send(results);
  });
});

module.exports = router;
