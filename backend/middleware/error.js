const ErrorHandler = require("../utils/errorhandlers");

module.exports = (err, req, res, next) => {
  err.status = err.status || 500;
  err.message = err.message || " Internal server error";

  if (err.name === "CastError") {
    const message = `Recource not found. Invalid:${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.status).json({
    Success: false,
    error: err.message,
  });
};
