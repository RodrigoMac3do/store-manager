const model = require('../models');

const listAll = async () => {
  const produtos = await model.products.listAll();

  return produtos;
};

module.exports = {
  listAll,
};
