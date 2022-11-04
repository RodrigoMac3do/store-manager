const sendError = require('../utils/sendError');
const model = require('../models');

const listAll = async () => {
  const products = await model.products.listAll();

  return products;
};

const findById = async (id) => {
  const [product] = await model.products.findById(id);

  if (product === undefined) {
    throw sendError(404, 'Product not found');
  }

  return product;
};

const insert = async (name) => {
  const newProduct = await model.products.insert(name);

  return newProduct;
};

const updateById = async (id, name) => {
  const product = await model.products.findById(id);
  if (product.length === 0) {
    throw sendError(404, 'Product not found');
  } else {
    await model.products.updateById(id, name);
  }
};

const remove = async (id) => {
  const product = await model.products.findById(id);
  
  if (product.length === 0) {
    throw sendError(404, 'Product not found');
  } else {
    await model.products.remove(id);
  }
};

module.exports = {
  listAll,
  findById,
  insert,
  updateById,
  remove,
};
