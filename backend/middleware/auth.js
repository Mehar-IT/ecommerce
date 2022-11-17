const ErrorHandler = require("../utils/errorhandlers");
const asyncErrorHandler = require("./asyncErrorHandler");
const JWT = require("jsonwebtoken");
exports.isAuthenticated = asyncErrorHandler(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("please login to access  this resource", 401));
  }

  JWT.verify(token, process.env.JWT_KEY, (err, user) => {
    if (err) {
      next(new ErrorHandler("token is not valid", 401));
    } else {
      req.user = user;
      next();
    }
  });
});

exports.authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `role ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
