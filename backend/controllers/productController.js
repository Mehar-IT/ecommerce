const Product = require("../models/productModel");

exports.createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};

exports.getAllProducts = async (req, res) => {
  const product = await Product.find();
  res.status(200).json({
    success: true,
    product,
  });
};

exports.updateProduct = async (req, res) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      sussess: false,
      message: "Product not found",
    });
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
};

exports.deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      sussess: false,
      message: "Product not found",
    });
  }
  await product.remove();

  res.status(200).json({
    success: true,
    message: "product is deleted",
  });
};

exports.getProductDetail = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      sussess: false,
      message: "Product not found",
    });
  }

  res.status(200).json({
    success: true,
    product,
  });
};
