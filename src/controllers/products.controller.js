const service = require('../services');

const listAll = async (_req, res, _next) => {
  const products = await service.products.listAll();
 
  res.status(200).json(products);
};

module.exports = {
  listAll,
};
