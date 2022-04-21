const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

router.get("/", productController.getProductList);
router.get("/:product_id", productController.getProductDetail);


module.exports = router