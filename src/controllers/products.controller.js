const service = require('../services');
const { productSchema } = require('../services/validations/schema');
const validateSchema = require('../services/validations/validationSchema');

const findAll = async (_req, res) => {
  const products = await service.products.findAll();

  res.status(200).json(products);
};

const findById = async (req, res) => {
  const id = Number(req.params.id);

  const product = await service.products.findById(id);

  res.status(200).json(product);
};

const findByTerm = async (req, res) => {
  const { q } = req.query;

  const product = await service.products.findByTerm(q);

  res.status(200).json(product);
};

const create = async (req, res) => {
  const { body } = req;

  await validateSchema(productSchema, body);

  const newProduct = await service.products.create(body);

  res.status(201).json(newProduct);
};

const updateById = async (req, res, next) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  try {
    await service.products.updateById(id, name);

    res.status(200).json({ id, name });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res) => {
  const id = Number(req.params.id);

  await service.products.remove(id);

  res.sendStatus(204);
};

module.exports = {
  findAll,
  findById,
  findByTerm,
  create,
  updateById,
  remove,
};
