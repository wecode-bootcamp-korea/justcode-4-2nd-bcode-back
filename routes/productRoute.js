const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

router.get('/list', productController.getProductList);
router.get('/detail/:product_id', productController.getProductDetail);
router.get('/visited', productController.getVisitedProduct);
router.get('/search', productController.searchProduct);

module.exports = router;
