const service = require('../services');

const listAll = async (_req, res, _next) => {
  const sales = await service.sales.listAll();
  
  res.status(200).json(sales);
};

module.exports = {
  listAll,
};
