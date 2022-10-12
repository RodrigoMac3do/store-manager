const model = require('../models');

const listAll = async () => {
  const sales = await model.sales.listAll();
  
  return sales;
};

module.exports = {
  listAll,
};