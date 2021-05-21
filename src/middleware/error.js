const { Prisma } = require(".prisma/client");
const ErrorResponse = require("../utils/ErrorResponse");

const errorHandler = async (err, req, res, next) => {
  //loading all errors to error list
  let currentError = err;

  currentError.Message = err.Message;

  console.log(currentError.stack.blue);

  if (err instanceof Prisma.PrismaClientKnownRequestError) {

    if (err.code === 'P2001') {
      currentError = new ErrorResponse('Kaynak bulunamadı', 404);
    }
    else if (err.code === 'P2002') {
      currentError = new ErrorResponse('Kaynak daha önce eklenmiş.', 400);
    }
    else if (err.code === 'P2003') {
      currentError = new ErrorResponse('Kaynak eklenirken hata oluştu. Kaynağın bağlı olduğu diğer kaynak bulunamadı', 400);
    }
    else if (err.code === 'P2025') {
      currentError = new ErrorResponse('Kaynak işleme koyulamadı.Kaynak bulunamadı', 404);
    }
    else {
      currentError = new ErrorResponse(`Hata oluştu : ${err.message}`, 400);
    }
  }

  res.status(currentError.statusCode || 500).json({
    success: false,
    message: currentError.message || "Server Error",
  });
};

module.exports = errorHandler;
