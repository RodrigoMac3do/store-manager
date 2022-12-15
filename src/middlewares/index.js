const name = require('./validationName');
const product = require('./validationProduct');
const quantity = require('./validationQuantity');
const nameProducts = require('./validationProductName');
const httpError = require('./http.error.middleware');

module.exports = {
  httpError,
  name,
  product,
  quantity,
  nameProducts,
};
