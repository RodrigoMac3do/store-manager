const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = {
  productSchema,
};
