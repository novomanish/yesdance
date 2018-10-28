const router = require('express').Router();
const dao = require('../helper/dao');

router.get('/upcoming', (req, res) => {
  getUpcomingProducts().then((results) => {
    res.send(results);
  });
});

const getUpcomingProducts = () => {
  return dao.query(`
    SELECT * 
    FROM product as p 
    LEFT JOIN event e ON p.event_ind = e.event_ind
    LEFT JOIN event_type et ON e.event_type_ind = et.event_type_ind
    WHERE e.startdate > NOW()
    ORDER BY e.enddate ASC;`
  )
}

const getProductDetails = (products) => {
  return dao.query(`
    SELECT * 
    FROM product as p 
    LEFT JOIN event e ON p.event_ind = e.event_ind
    LEFT JOIN event_type et ON e.event_type_ind = et.event_type_ind
    WHERE p.product_ind in (?)
    ORDER BY e.enddate ASC;`,
    products
  )
}



module.exports = {
  router,
  getProductDetails
};
