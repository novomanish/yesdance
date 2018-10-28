const router = require('express').Router();
const dao = require('../helper/dao');

router.get('/upcoming', (req, res) => {
  getUpcomingProducts().then((results) => {
    res.send(results);
  });
});


const getUpcomingProducts = async () => {
  const products = await dao.query(`
    SELECT * 
    FROM product as p 
    LEFT JOIN event e ON p.event_ind = e.event_ind
    WHERE e.startdate > NOW()
    ORDER BY e.enddate ASC;`
  )
  await joinEvents(products);
  return products;
}

const getProductDetails = async (rawProducts) => {
  const products = await dao.query(`
    SELECT * 
    FROM product as p 
    WHERE p.product_ind in (?);`,
    [rawProducts.map(p => p.product_ind)]
  );
  await joinEvents(products);
  await joinPrivileges(products);
  return products;
}

const joinEvents = async (products) => {
  const productWithEvents = products.filter(p => !!p.event_ind);
  if(productWithEvents.length > 0) {
    const events =  await dao.query(`
      SELECT * 
      FROM event e
      LEFT JOIN event_type et ON e.event_type_ind = et.event_type_ind
      WHERE e.event_ind in (?);`,
      [productWithEvents.map(p => p.event_ind)]
    )

    productWithEvents.forEach(p => {
      p.event = events.find(e => e.event_ind == p.event_ind);
    });
  }
}

const joinPrivileges = async (products) => {
  const productWithPrivilege = products.filter(p => !!p.privilege_ind);
  if(productWithPrivilege.length > 0) {
    const privileges =  await dao.query(`
      SELECT * 
      FROM privilege pr
      WHERE pr.privilege_ind in (?);`,
      [productWithPrivilege.map(p => p.privilege_ind)]
    )

    productWithPrivilege.forEach(p => {
      p.privilege = privileges.find(e => e.privilege_ind == p.privilege_ind)
    });
  }
}

const helper = {
  inds(product) {
    return product.map(p => p.product_ind);
  }
}

module.exports = {
  router,
  getProductDetails,
  helper
};
