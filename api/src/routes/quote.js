const router = require('express').Router();
const dao = require('../helper/dao');
const product = require('./product');

router.post('/', async (req, res) => {
  const quote = await getQuote({products: req.body.products, customer: req.body.customer});
  res.send(quote);
});

const getQuote = async ({products, customer}) => {
  let total = 0;
  if(products && products.length > 0) {
    products = await product.getProductDetails(products);
    const discountsOfCatalog = await getDiscountsForProducts(products);
    const srcProducts = products;
    const discounts = filterValidDiscounts({discounts: discountsOfCatalog, srcProducts});
    attachDiscounts({discounts, products});
    calculatePrice(products);
    total = calculateTotal(products);
  }
  return {
    products,
    total
  }
}

const getDiscountsForProducts = (products) => {
  return dao.query(`
    SELECT * 
    FROM discount as d
    LEFT JOIN product as p on p.product_ind = d.product_ind 
    WHERE d.target_product_ind in (?);`,
    [product.helper.inds(products)]
  )
}

const filterValidDiscounts = ({discounts, srcProducts}) => {
  return discounts.filter(d => !!srcProducts.find(p => p.product_ind == d.product_ind));
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

const calculateTotal = (products) => {
  return products.reduce((totalSoFar, p) => {
    console.log(p)
    return totalSoFar + p.amount
  }, 0);
}


module.exports = {
  router,
  getQuote
};
