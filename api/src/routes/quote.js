const router = require('express').Router();
const dao = require('../helper/dao');
const product = require('./product');

router.post('/', async (req, res) => {
  const products = await product.getProductDetails(req.body.products);
  const srcDiscounts = await getDiscountsForProducts(products);
  const srcProducts = products;
  const discounts = filterValidDiscounts({srcDiscounts, srcProducts});
  attachDiscounts({discounts, products});
  calculatePrice(products);
  res.send(products);
});

const getDiscountsForProducts = (products) => {
  return dao.query(`
    SELECT * 
    FROM discount as d
    LEFT JOIN product as p on p.product_ind = d.product_ind 
    WHERE d.target_product_ind in (?);`,
    [product.helper.inds(products)]
  )
}

const filterValidDiscounts = ({srcDiscounts, srcProducts}) => {
  return srcDiscounts.filter(d => !!srcProducts.find(p => p.product_ind == d.product_ind));
}

const attachDiscounts = ({discounts, products}) => {
  products.forEach(p => {
    p.discounts = discounts.filter(d => p.product_ind == d.target_product_ind)
  })
}

const calculatePrice = (products) => {
  products.forEach(p => {
    if(p.discounts && p.discounts.length > 0) {
      p.discounts.forEach(d => {
        d.amount = d.discount_price;
      });
      p.amount = p.discounts[0].amount;
    }
    if(!p.amount) p.amount = p.product_price;
  })
}


module.exports = router;
