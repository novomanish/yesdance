const router = require('express').Router();
const dao = require('../helper/dao');

router.get('/', (req, res) => {
  dao.get('event').then((results) => {
    res.send(results);
  });
});

module.exports = router;
