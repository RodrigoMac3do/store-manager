const httpException = (err, message) => {
  const error = new Error(message);

  error.status = err;

  return error;
};

module.exports = httpException;
