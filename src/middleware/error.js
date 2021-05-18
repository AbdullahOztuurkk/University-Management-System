const ErrorResponse = require("../utils/ErrorResponse");

const errorHandler = async (err, req, res, next) => {
  //loading all errors to error list
  let currentError = err;

  currentError.Message = err.Message;

  console.log(currentError.stack.blue);

  res.status(currentError.statusCode || 500).send({
    Success: false,
    message: err.Message || "Server Error",
  });
};

module.exports = errorHandler;
