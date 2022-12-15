const httpException = require('../../utils/http.exception');
const { mapStatusCode, mapMessage } = require('./statusCode');

const validateSchema = (schema, data) => {
  const { error, value } = schema.validate(data);

  if (error) {
    throw httpException(
      mapStatusCode(error.message),
      mapMessage(error.message),
    );
  }

  return value;
};

module.exports = validateSchema;
