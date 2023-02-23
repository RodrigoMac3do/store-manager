const statusCode = {
  CREATED: 201,
  SUCCESSFUL: 200,
  BAD_REQUEST: 400,
  ACCESS_DENIED: 401,
  UNPROCESSABLE: 422,
};

const mapStatusCode = (errorMessage) => {
  if (errorMessage.includes('required')) {
    return statusCode.BAD_REQUEST;
  }
  if (errorMessage.includes('must')) {
    return statusCode.UNPROCESSABLE;
  }
  return statusCode.ACCESS_DENIED;
};

module.exports = {
  statusCode,
  mapStatusCode,
};
