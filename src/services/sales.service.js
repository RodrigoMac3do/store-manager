const sendError = require('../helpers/sendError');
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

module.exports = {
  listAll,
  findById,
};
