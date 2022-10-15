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

const insert = async (req, res, next) => {
  const { name } = req.body;
  const products = await service.products.listAll();

  try {
    await service.products.insert(name);
    const newProduct = {
      id: products.length + 1,
      ...req.body,
    };

    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  try {
    await service.products.updateById({ id, name });

    const productUpdated = {
      id,
      ...req.body,
    };

    res.status(200).json(productUpdated);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listAll,
  findById,
  insert,
  updateById,
};
