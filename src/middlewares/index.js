const name = require('./validationName');
const product = require('./validationProduct');
const quantity = require('./validationQuantity');
const nameProducts = require('./validationProductName');
const httpErrorMiddleware = require('./http.error.middleware');

module.exports = {
  httpErrorMiddleware,
  name,
  product,
  quantity,
  nameProducts,
};
