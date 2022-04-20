const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

router.use("/", productController.getProductList);
router.use("/:product_id", productController.getProductDetail);


module.exports = router