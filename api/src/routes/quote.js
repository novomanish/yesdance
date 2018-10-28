const router = require('express').Router();
const dao = require('../helper/dao');

router.post('/', (req, res) => {
  res.send(req.body);
});

module.exports = router;
