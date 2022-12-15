const httpException = require('../utils/http.exception');
const model = require('../models');

const findAll = async () => {
  const products = await model.products.findAll();

  return products;
};

const findById = async (id) => {
  const [product] = await model.products.findById(id);

  if (product === undefined) {
    throw httpException(404, 'Product not found');
  }

  return product;
};

const insert = async (body) => {
  const { name } = body;

  const id = await model.products.insert(name);

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
  const product = await model.products.findById(id);

  if (product.length === 0) {
    throw httpException(404, 'Product not found');
  } else {
    await model.products.remove(id);
  }
};

module.exports = {
  findAll,
  findById,
  insert,
  updateById,
  remove,
};
