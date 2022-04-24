const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categoryController");

router.get("/list", categoryController.categoryList);
router.get("/:product_id", categoryController.getProductDetail);


module.exports = router