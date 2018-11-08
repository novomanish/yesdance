const router = require('express').Router();
const dao = require('../helper/dao');
const quote = require('./quote');

router.put('/', async (req, res) => {
  const quotation = await quote.getQuote({
    products: req.body.products,
    customer: req.body.customer,
  });
  const purchaseInd = await dao.insert('purchase', {
    customer_ind: quotation.customer && quotation.customer.customer_ind,
    amount: quotation.total,
  });
  quotation.products.forEach(async (p) => {
    await dao.insert('purchase_item', {
      purchase_ind: purchaseInd,
      product_ind: p.product_ind,
      amount: p.amount,
    });
  });
  res.send('');
});

module.exports = {
  router,
};
