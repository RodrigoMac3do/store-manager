const sendError = require('../helpers/sendError');
const model = require('../models');

const listAll = async () => {
  const products = await model.products.listAll();

  return products;
};

const findById = async (id) => {
  const product = await model.products.findById(id);

  if (product === undefined) {
    throw sendError(404, 'Product not found');
  }

  return product;
};

const insert = async (name) => {
  const newProduct = await model.products.insert(name);

  return newProduct;
};

module.exports = {
  listAll,
  findById,
  insert,
};
