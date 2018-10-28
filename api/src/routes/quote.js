const router = require('express').Router();
const dao = require('../helper/dao');
const product = require('./product');

router.post('/', async (req, res) => {
  const products = await product.getProductDetails(req.body.products);
  res.send(products);
});

module.exports = router;
