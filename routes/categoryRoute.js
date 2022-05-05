const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categoryController");

router.get("/", categoryController.categoryList);
router.get("/:id", categoryController.categoryProduct);

module.exports = router