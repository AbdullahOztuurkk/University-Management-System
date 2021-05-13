class ErrorResponse extends Error {
    constructor(Message, statusCode) {
      super();
      this.Message=Message;
      this.statusCode = statusCode;
    }
  }
  module.exports = ErrorResponse;
  