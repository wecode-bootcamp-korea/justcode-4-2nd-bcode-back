const jwt = require('jsonwebtoken');

const productService = require('../services/productService');
const userService = require('../models/userDao');

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
        const token = req.headers.authorization;

        if (!product_id || !limit) {
            return res
                .status(400)
                .json({ message: 'MISSING_PRODUCTID_OR_LIMIT' });
        }

        let userId = null;
        if (token) {
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
            const userInfo = await userService.getUserInfo(decodedToken.email);
            userId = await userInfo[0].id;
        }

        const productDetail = await productService.getProductDetail(
            product_id,
            limit
        );

        return res
            .status(200)
            .json({ userId: userId, productDetail: productDetail });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'SERVER_ERROR' });
    }
};

const getVisitedProduct = async (req, res) => {
    try {
        const { product_id } = req.query;

        if (!product_id) {
            return res
                .status(400)
                .json({ message: 'NO_PRODUCT_ID', visitedProduct: [] });
        }

        const visitedProduct = await productService.getVisitedProduct(
            product_id
        );

        return res.status(200).json(visitedProduct);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'SERVER_ERROR ' });
    }
};

const searchProduct = async (req, res) => {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({ message: 'MISSING_NAME' });
        }

        search = { name: name };
        const searchedProduct = await productService.searchProduct(search);

        return res.status(200).json(searchedProduct);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'SERVER_ERROR' });
    }
};

module.exports = {
    getProductList,
    getProductDetail,
    getVisitedProduct,
    searchProduct,
};
