const productService = require('../services/productService');

const getProductList = async (req, res) => {
    try {
        const productList = await productService.getProductList();

        return res.status(200).json(productList);
    } catch (error) {
        res.status(500).json({ message: 'SERVER_ERROR' });
    }
};

const getProductDetail = async (req, res) => {
    try {
        const { product_id } = req.params;
        const { limit } = req.query;

        const productDetail = await productService.getProductDetail(
            product_id,
            limit
        );

        return res.status(200).json(productDetail);
    } catch (error) {
        res.status(500).json({ message: 'SERVER_ERROR' });
    }
};

const getVisitedProduct = async (req, res) => {
    try {
        const { product_id } = req.query;

        const visitedProduct = await productService.getVisitedProduct(
            product_id
        );

        return res.status(200).json(visitedProduct);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'SERVER_ERROR ' });
    }
};

module.exports = {
    getProductList,
    getProductDetail,
    getVisitedProduct,
};
