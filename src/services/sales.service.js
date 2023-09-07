const httpException = require('../utils/http.exception');
const model = require('../models');

const findAll = async () => {
  const sales = await model.sales.findAll();

  return sales;
};

const findById = async (id) => {
  const sale = await model.sales.findById(id);

  if (sale.length === 0) {
    throw httpException(404, 'Sale not found');
  }

  return sale;
};

const create = async (body) => {
  const products = await Promise.all(
    body.map(({ productId }) => model.products.findById(productId)),
  );

  if (products.includes(undefined)) {
    throw httpException(404, 'Product not found');
  }

  const id = await model.sales.createSale(body);

  await Promise.all(
    body.map(({ productId, quantity }) =>
      model.sales.create({ productId, quantity, id })),
  );

  const newSale = {
    id,
    itemsSold: [...body],
  };

  return newSale;
};

const updateById = async (id, body) => {
  await findById(id);

  const products = await Promise.all(
    body.map(({ productId }) => model.products.findById(productId)),
  );

  if (products.includes(undefined)) {
    throw httpException(404, 'Product not found');
  }

  await Promise.all(body.map((peq) => model.sales.updateById(id, peq)));

  return { saleId: id, itemsUpdated: [...body] };
};

const remove = async (id) => {
  await findById(id);

  return model.sales.remove(id);
};

module.exports = {
  findAll,
  findById,
  create,
  updateById,
  remove,
};
