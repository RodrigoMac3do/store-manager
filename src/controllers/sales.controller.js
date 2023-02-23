const service = require('../services');
const { saleSchema } = require('../services/validations/schema');
const validateSchema = require('../services/validations/validationSchema');

const findAll = async (_req, res) => {
  const sales = await service.sales.findAll();

  res.status(200).json(sales);
};

const findById = async (req, res) => {
  const id = Number(req.params.id);

  const sale = await service.sales.findById(id);

  res.status(200).json(sale);
};

const create = async (req, res) => {
  const { body } = req;

  await validateSchema(saleSchema, body);

  const newSale = await service.sales.create(body);

  res.status(201).json(newSale);
};

const updateById = async (req, res) => {
  const id = Number(req.params.id);
  const { body } = req;

  await validateSchema(saleSchema, body);

  const productUpdated = await service.sales.updateById(id, body);

  res.status(200).json(productUpdated);
};

const remove = async (req, res) => {
  const id = Number(req.params.id);

  await service.sales.remove(id);

  res.sendStatus(204);
};

module.exports = {
  findAll,
  findById,
  create,
  updateById,
  remove,
};
