const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categoryController");

router.get("/", categoryController.categoryList);
router.get("/:id", categoryController.categoryDetail);
router.get("/limit/:id", categoryController.categoryDetailLimit);
router.get("/highprice/:id", categoryController.categoryHighPrice);
router.get("/rowprice/:id", categoryController.categoryRowPrice);
router.get("/review/:id", categoryController.categoryReview);

module.exports = router