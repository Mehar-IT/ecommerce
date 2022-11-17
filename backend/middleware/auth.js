const ErrorHandler = require("../utils/errorhandlers");
const asyncErrorHandler = require("./asyncErrorHandler");
const JWT = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticated = asyncErrorHandler(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("please login to access  this resource", 401));
  }

  const decodedData = JWT.verify(token, process.env.JWT_KEY);
  req.user = await User.findById(decodedData.id);
  next();
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
