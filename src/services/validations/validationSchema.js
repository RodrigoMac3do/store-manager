const httpException = require('../../utils/http.exception');
const { mapStatusCode } = require('./statusCode');

const validateSchema = (schema, data) => {
  const { error, value } = schema.validate(data);

  if (error) {
    throw httpException(mapStatusCode(error.message), error.message);
  }

  return value;
};

module.exports = validateSchema;
