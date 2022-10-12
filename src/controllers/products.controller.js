const service = require('../services');

const listAll = async (_req, res, _next) => {
  const products = await service.products.listAll();

  res.status(200).json(products);
};

const findById = async (req, res, next) => {
  const id = Number(req.params.id);

  try {
    const product = await service.products.findById(id);

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listAll,
  findById,
};
