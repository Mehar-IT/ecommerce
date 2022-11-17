const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandlers");
const asyncErrorHandler = require("../middleware/asyncErrorHandler");
const sendToken = require("../utils/jwtToken");

exports.registerUser = asyncErrorHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is a simple id",
      url: "profilepicUrl",
    },
  });

  sendToken(user, 201, res);
});

exports.loginUser = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email and password", 401));
  }
  const isPasswordMatch = await user.comparePassowrd(password);

  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid email and password", 401));
  }
  sendToken(user, 200, res);
});

exports.logotUser = asyncErrorHandler(async (req, res, next) => {
  const option = {
    expires: new Date(Date.now()),
    httpOnly: true,
  };
  res.cookie("token", null, option);
  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});
