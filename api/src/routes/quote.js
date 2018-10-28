const router = require('express').Router();
const dao = require('../helper/dao');
const product = require('./product');

router.post('/', async (req, res) => {
  const products = await product.getProductDetails(req.body.products);
  const discounts = await getProductDiscounts(products);
  res.send(discounts);
});

const getProductDiscounts = (products) => {
  return dao.query(`
    SELECT * 
    FROM discount as d 
    WHERE d.product_ind in (?);`,
    [products]
  )
}


module.exports = router;
