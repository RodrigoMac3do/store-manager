const httpException = require('../utils/http.exception');

const statusCode = (details) => {
  const { type } = details[0];

  const errorStatus = {
    'any.required': 400,
    'boolean.base': 400,
    'number.base': 400,
    'string.empty': 422,
    'string.min': 400,
  };

  return errorStatus[type] || 400;
};

const validateSchema = (schema, data) => {
  const { error, value } = schema.validate(data);

  if (error) {
    throw httpException(statusCode(error.details), error.message);
  }

  return value;
};

module.exports = validateSchema;
