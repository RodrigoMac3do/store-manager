const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

const saleSchema = Joi.array().items({
  productId: Joi.number().min(1).required().messages({
    'any.required': '"productId" is required',
    'number.base': '"productId" must be a number',
    'number.min': '"quantity" must be greater than or equal to 1',
  }),
  quantity: Joi.number().min(1).required().messages({
    'any.required': '"quantity" is required',
    'number.base': '"quantity" must be a number',
    'number.min': '"quantity" must be greater than or equal to 1',
  }),
});

module.exports = {
  productSchema,
  saleSchema,
};
