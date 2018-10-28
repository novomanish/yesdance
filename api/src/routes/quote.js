const router = require('express').Router();
const dao = require('../helper/dao');
const product = require('./product');

router.post('/', (req, res) => {
  product.getProductDetails(req.body.products).then((products) => {
    res.send(products);
  });
});

module.exports = router;
