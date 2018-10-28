const router = require('express').Router();
const dao = require('../helper/dao');
const quote = require('./quote');

router.put('/', async (req, res) => {
  const quotation = await quote.getQuote({products: req.body.products, customer: req.body.customer});
  dao.put('purchase', {'customer_ind': 1, 'amount': quotation.total});
});

module.exports = {
  router
};
