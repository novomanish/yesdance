const router = require('express').Router();
const dao = require('../helper/dao');
const quote = require('./quote');

router.put('/', async (req, res) => {
  const quotation = await quote.getQuote({products: req.body.products, customer: req.body.customer});
  const purchase_ind = await dao.insert('purchase', {'customer_ind': 1, 'amount': quotation.total});
  quotation.products.forEach(async p => {
    await dao.insert('purchase_item', {
      purchase_ind,
      product_ind: p.product_ind,
      amount: p.amount
    });
  });
  res.send('');

});

module.exports = {
  router
};
