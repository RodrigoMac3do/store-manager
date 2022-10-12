const sendError = (err, message) => {
  const error = new Error(message);

  error.status = err;

  return error;
};

module.exports = sendError;
