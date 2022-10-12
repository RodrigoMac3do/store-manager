const service = require('../services');

const listAll = async (_req, res, _next) => {
  const sales = await service.sales.listAll();
  
  res.status(200).json(sales);
};

const findById = async (req, res, next) => {
  const id = Number(req.params.id);

  try {
    const sale = await service.sales.findById(id);

    res.status(200).json(sale);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listAll,
  findById,
};
