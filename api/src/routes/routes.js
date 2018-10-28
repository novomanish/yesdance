module.exports = (app) => {
  const map = (apiPath, router) => {
    app.use(`/api/${apiPath}`, router);
  }

  map('customer', require('./customer'));
  map('product', require('./product').router);
  map('quote', require('./quote'));
}

