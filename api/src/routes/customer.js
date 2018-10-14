const router = require('express').Router();
const dao = require('../helper/dao');

router.get('/', (req, res) => {
  dao.get('person').then((results) => {
    res.send(results);
  });
});

module.exports = router;
