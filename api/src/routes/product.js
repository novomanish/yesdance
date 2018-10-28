const router = require('express').Router();
const dao = require('../helper/dao');

router.get('/upcoming', (req, res) => {
  dao.query(`
    SELECT * 
    FROM product as p 
    LEFT JOIN event e ON p.event_ind = e.event_ind
    LEFT JOIN event_type et ON e.event_type_ind = et.event_type_ind
    WHERE e.startdate > NOW()
    ORDER BY e.enddate ASC;`
  ).then((results) => {
    res.send(results);
  });
});

module.exports = router;
