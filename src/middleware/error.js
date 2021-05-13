const ErrorResponse = require("../utils/ErrorResponse");

const errorHandler = async(err, req, res, next) => {
  //loading all errors to error list
  let currentError = err;

  currentError.Message = err.Message;

  console.log(currentError.stack.blue);
  
  if (err.name === "CastError") {
    const ErrorMessage = `The specified entity could not be found.`;
    currentError = new ErrorResponse(ErrorMessage, 404);
  }

  if (err.code === 11000) {
    const ErrorMessage = `The specified entity already exists.`;
    currentError = new ErrorResponse(ErrorMessage, 404);
  }

  if (err.name === "ValidationError") {
    const ErrorMessage = `The specified Entity does not match any rules..`;
    currentError = new ErrorResponse(ErrorMessage, 404);
  }
  
  res.status(currentError.statusCode || 500).send({
    Success: false,
    message: err.Message || "Server Error",
  });
};

module.exports = errorHandler;
