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

const create = async (body) => {
  const { name } = body;

  const id = await model.products.create(name);

  const newProduct = {
    id,
    name,
  };

  return newProduct;
};

const updateById = async (id, name) => {
  const product = await model.products.findById(id);

  if (product.length === 0) {
    throw httpException(404, 'Product not found');
  } else {
    await model.products.updateById(id, name);
  }
};

const remove = async (id) => {
  await findById(id);

  await model.products.remove(id);
};

module.exports = {
  findAll,
  findById,
  create,
  updateById,
  remove,
};
