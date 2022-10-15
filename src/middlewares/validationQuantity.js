const validateQuantity = (req, res, next) => {
  const undefinedQuantity = req.body
    .map((elem) => elem.quantity)
    .includes(undefined);

  const zero = req.body.map((elem) => elem.quantity).some((elem) => elem < 1);

  if (undefinedQuantity) {
    res.status(400).json({ message: '"quantity" is required' });
  } else if (zero) {
    res
      .status(422)
      .json({ message: '"quantity" must be greater than or equal to 1' });
  } else {
    next();
  }
};

module.exports = validateQuantity;
