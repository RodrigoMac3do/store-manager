const model = require('../models');

const keyProduct = async (req, res, next) => {
  const undefinedProductId = req.body
    .map((e) => Object.keys(e).includes('productId'))
    .includes(false);

  if (undefinedProductId) {
    res.status(400).json({ message: '"productId" is required' });
  } else {
    next();
  }
};

const valuesProduct = async (req, res, next) => {
  const valuesProductId = req.body.map((e) => e.productId);

  const productIdDB = await model.products.findById(valuesProductId[0]);

  const allProducts = await model.products.listAll();

  const allProductsIds = allProducts.map((e) => e.id);

  const final = valuesProductId
    .map((e) => allProductsIds.includes(e))
    .includes(false);

  if (productIdDB.length === 0) {
    res.status(404).json({ message: 'Product not found' });
  } else if (final) {
    res.status(404).json({ message: 'Product not found' });
  } else {
    next();
  }
};

module.exports = {
  keyProduct,
  valuesProduct,
};
