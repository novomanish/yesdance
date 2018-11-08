const router = require('express').Router();
const dao = require('../helper/dao');
const product = require('./product');

const attachDiscounts = ({ discounts, products }) => {
  products.forEach((p) => {
    p.discounts = discounts.filter(d => p.product_ind === d.target_product_ind);
  });
};
const calculatePrice = (products) => {
  products.forEach((p) => {
    if (p.discounts && p.discounts.length > 0) {
      p.discounts.forEach((d) => {
        d.amount = d.discount_price;
      });
      p.amount = p.discounts[0].amount;
    }
    if (!p.amount) p.amount = p.product_price;
  });
};

const calculateTotal = products => products.reduce((totalSoFar, p) => {
  console.log(p);
  return totalSoFar + p.amount;
}, 0);

const filterValidDiscounts = ({ discounts, srcProducts }) => discounts.filter(
  d => !!srcProducts.find(p => p.product_ind === d.product_ind),
);

const getDiscountsForProducts = products => dao.query(`
    SELECT * 
    FROM discount as d
    LEFT JOIN product as p on p.product_ind = d.product_ind 
    WHERE d.target_product_ind in (?);`,
[product.helper.inds(products)]);

const getQuote = async ({ products: rawProducts, customer }) => {
  let total = 0;
  let products;
  if (rawProducts && rawProducts.length > 0) {
    products = await product.getProductDetails(rawProducts);
    const discountsOfCatalog = await getDiscountsForProducts(rawProducts);
    const srcProducts = products;
    const discounts = filterValidDiscounts({ discounts: discountsOfCatalog, srcProducts });
    attachDiscounts({ discounts, products });
    calculatePrice(products);
    total = calculateTotal(products);
  }
  return {
    products,
    customer,
    total,
  };
};

router.post('/', async (req, res) => {
  const quote = await getQuote({ products: req.body.products, customer: req.body.customer });
  res.send(quote);
});


module.exports = {
  router,
  getQuote,
};
