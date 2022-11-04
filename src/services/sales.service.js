const sendError = require('../utils/sendError');
const model = require('../models');

const listAll = async () => {
  const sales = await model.sales.listAll();

  return sales;
};

const findById = async (id) => {
  const sale = await model.sales.findById(id);

  if (sale.length === 0) {
    throw sendError(404, 'Sale not found');
  }

  return sale;
};

const insert = async (produtos) => {
  const newSale = await model.sales.insert(produtos);

  return newSale;
};

const remove = async (id) => {
  const sale = await model.sales.findById(id);

  if (sale.length === 0) {
    throw sendError(404, 'Sale not found');
  } else {
    await model.sales.remove(id);
  }
};

module.exports = {
  listAll,
  findById,
  insert,
  remove,
};
