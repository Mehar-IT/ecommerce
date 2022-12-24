const asyncErrorHandler = require("../middleware/asyncErrorHandler");
const stripeKey = require("stripe");

exports.processPayment = asyncErrorHandler(async (req, res, next) => {
  const stripe = stripeKey(process.env.STRIPE_SECRET_KEY);
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
  });
  res.status(200).json({
    success: true,
    client_secret: myPayment.client_secret,
  });
});

exports.sendStripeApiKey = asyncErrorHandler(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});