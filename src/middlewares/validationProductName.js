const model = require('../models');

const nameProducts = async (req, res, next) => {
  const { name } = req.body;
  const id = Number(req.params.id);

  const productIdDB = await model.products.findById(id);

  if (!name) {
    res.status(400).json({ message: '"name" is required' });
  } else if (productIdDB.length === 0) {
    res.status(404).json({ message: 'Product not found' });
  } else if (name.length < 5) {
    res
      .status(422)
      .json({ message: '"name" length must be at least 5 characters long' });
  } else {
    next();
  }
};

module.exports = nameProducts;
