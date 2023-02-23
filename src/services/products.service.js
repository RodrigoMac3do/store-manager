const httpException = require('../utils/http.exception');
const model = require('../models');

const findAll = async () => {
  const products = await model.products.findAll();

  return products;
};

const findById = async (id) => {
  const product = await model.products.findById(id);

  if (!product) {
    throw httpException(404, 'Product not found');
  }

  return product;
};

const findByTerm = async (q) => {
  const product = await model.products.findByTerm(q);

  if (!product) return findAll();

  return product;
};

const create = async (body) => {
  const { name } = body;

  const id = await model.products.create(name);

  const newProduct = {
    id,
    name,
  };

  return newProduct;
};

const updateById = async (id, body) => {
  const { name } = body;

  await findById(id);

  const product = await model.products.updateById(id, name);

  return product;
};

const remove = async (id) => {
  await findById(id);

  await model.products.remove(id);
};

module.exports = {
  findAll,
  findById,
  findByTerm,
  create,
  updateById,
  remove,
};
