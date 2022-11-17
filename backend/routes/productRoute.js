const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetail,
} = require("../controllers/productController");
const { isAuthenticated, authorizeRole } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);
router
  .route("/product/new")
  .post(isAuthenticated, authorizeRole("admin"), createProduct);
router
  .route("/product/:id")
  .put(isAuthenticated, authorizeRole("admin"), updateProduct)
  .delete(isAuthenticated, authorizeRole("admin"), deleteProduct)
  .get(getProductDetail);

module.exports = router;
